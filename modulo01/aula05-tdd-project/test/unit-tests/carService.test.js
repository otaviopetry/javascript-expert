const { describe, it, before, beforeEach } = require('mocha');
const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');

const CarService = require('../../src/service/carService');
const carsDatabase = join(__dirname, './../../database', 'cars.json');
const Transaction = require('../../src/entities/transaction');

const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json'),
}

describe('CarService', () => {
    let service = { };
    let sandbox = { };

    before(() => {
        service = new CarService({
            cars: carsDatabase,
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    })

    describe('getRandomPositionFromArray', () => {
        it('should retrieve a random position from an array', () => {
            const data = [0, 1, 2, 3, 4];
            const result = service.getRandomPositionFromArray(data);
    
            expect(result).to.be.lte(data.length).and.be.gte(0);
        });
    });

    describe('chooseRandomCar', () => {
        it('should choose the first id from carIds in carCategory', () => {
            const carCategory = mocks.validCarCategory;
            const carIdIndex = 0;
    
            sandbox.stub(
                service,
                service.getRandomPositionFromArray.name,
            ).returns(carIdIndex);
    
            const result = service.chooseRandomCar(carCategory);
            const expected = carCategory.carIds[carIdIndex];
    
            expect(service.getRandomPositionFromArray.calledOnce).to.be.true;
            expect(result).to.be.equal(expected);
        });
    });    

    describe('getAvailableCar', () => {
        it('given a category, it should return an available car', async () => {
            const car = mocks.validCar;
            const carCategory = Object.create(mocks.validCarCategory);

            carCategory.carIds = [car.id];

            sandbox.stub(
                service.carRepository,
                service.carRepository.find.name,
            ).resolves(car);

            sandbox.spy(
                service,
                service.chooseRandomCar.name,
            );

            const result = await service.getAvailableCar(carCategory);
            const expected = car;

            expect(service.chooseRandomCar.calledOnce).to.be.true;
            expect(service.carRepository.find.calledWithExactly(car.id)).to.be.true;
            expect(result).to.be.deep.equal(expected);
        });
    });

    describe('calculateFinalPrice', () => {
        it('given a category, customer and numberOfDays, it should calculate final amount in real', () => {
            const customer = Object.create(mocks.validCustomer);
            customer.age = 50;
    
            const carCategory = Object.create(mocks.validCarCategory);
            carCategory.price = 37.6;
    
            const numberOfDays = 5;
    
            sandbox.stub(
                service,
                "taxesBasedOnAge",
            ).get(() => [{ from: 40, to: 50, then: 1.3 }]);
    
            const expected = service.currencyFormat.format(244.40);
            const result = service.calculateFinalPrice(
                carCategory,
                customer,
                numberOfDays,
            );
    
            expect(result).to.be.deep.equal(expected);
        });
    });

    describe('rent', () => {
        it('given a customer and a car category, it should return a transaction receipt', async () => {
            const car = mocks.validCar;
            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: [car.id],
            };
    
            const customer = Object.create(mocks.validCustomer);
            customer.age = 20;
    
            const numberOfDays = 5;
            const dueDate = "10 de fevereiro de 2023";
    
            const now = new Date(2023, 1, 5);
    
            sandbox.useFakeTimers(now.getTime());
            sandbox.stub(
                service.carRepository,
                service.carRepository.find.name,
            ).resolves(car);
    
            const expectedAmount = service.currencyFormat.format(206.8);
            const result = await service.rent(
                carCategory, customer, numberOfDays,
            );
            const expected = new Transaction({
                customer,
                car,
                dueDate,
                amount: expectedAmount,
            });
    
            expect(result).to.be.deep.equal(expected);
        });
    });
});