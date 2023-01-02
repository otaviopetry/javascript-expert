const { describe, it, before } = require('mocha');
const { join } = require('path');

const CarService = require('./../../src/service/carService');
const carsDatabase = join(__dirname, './../../database', 'cars.json');

describe('CarService', () => {
    let carService = { };

    before(() => {
        carService = new CarService({
            cars: carsDatabase,
        });

        console.log('carsDatabase', carsDatabase);
        console.log('CarService', CarService);
    });
    
    it('given a category, it should return an available car', async () => {
        const result = await carService.test('fbf9e4b6-9f09-4f5d-9e48-2a488f8cec8f');
        
        console.log('result', result);
    });
});