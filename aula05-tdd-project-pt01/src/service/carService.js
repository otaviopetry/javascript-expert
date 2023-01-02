const CarRepository = require('../repository/carRepository');

class CarService {
    constructor({ cars }) {
        this.carRepository = new CarRepository({ file: cars });
    }

    test(id) {
        return this.carRepository.find(id);
    }
}

module.exports = CarService;