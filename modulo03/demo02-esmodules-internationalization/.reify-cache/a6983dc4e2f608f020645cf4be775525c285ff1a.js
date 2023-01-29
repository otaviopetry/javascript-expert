"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);
const { describe, it } = mocha;

const { expect } = chai;


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
            .generateInstanceFromObject({
                id: 1,
                vehicles: 'Carro,Bike,Moto',
                kmTraveled: '111000',
                from: '2007-03-20',
                to: '2012-05-20',
            }).formatted('pt-BR');
        
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

