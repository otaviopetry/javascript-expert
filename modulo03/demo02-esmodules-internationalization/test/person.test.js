import mocha from 'mocha';
const { describe, it } = mocha;
import chai from 'chai';
const { expect } = chai;
import Person from '../src/person.js';

describe('Person', () => {
    it('should return a Person instance from a string', () => {
        const person = Person.generateInstanceFromString('1 Carro,Bike,Moto 666000 2007-03-20 2012-05-20');

        const expected = {
            from: '2007-03-20',
            to: '2012-05-20',
            vehicles: ['Carro', 'Bike', 'Moto'],
            kmTraveled: '666000',
            id: '1'
        };

        expect(person).to.be.deep.equal(expected);
    });

    it('should return a formatted version of the object', () => {
        const person = Person
            .generateInstanceFromString('1 Carro,Bike,Moto 111000 2007-03-20 2012-05-20')
            .formatted('pt-BR');
        
        const expected = {
            from: '20 de março de 2007',
            to: '20 de maio de 2012',
            vehicles: 'Carro, Bike e Moto',
            kmTraveled: '111.000 km',
            id: 1,
        };

        expect(person).to.be.deep.equal(expected);
    });
});

