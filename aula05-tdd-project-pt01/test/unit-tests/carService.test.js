const { describe, it, before, beforeEach } = require('mocha');
const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');

const CarService = require('./../../src/service/carService');
const carsDatabase = join(__dirname, './../../database', 'cars.json');

const mocks = {
    validCarCategory: require('./../mocks/valid-carCategory.json'),
    validCar: require('./../mocks/valid-car.json'),
    validCustomer: require('./../mocks/valid-customer.json'),
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
});