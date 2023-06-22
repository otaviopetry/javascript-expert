const rewireMock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

const dbData = [
    { name: 'Mariazinha' },
    { name: 'Joãozinho' },    
]

class MockDatabase {
    connect = () => this;
    find = async (query) => dbData;
}

rewireMock(() => require('./../src/util/database')).with(MockDatabase);

;(async () => {
    {
        const expected = [
            { name: 'MARIAZINHA' },
            { name: 'JOÃOZINHO' },    
        ];
        rewireMock.enable();

        const UserFactory = require('../src/factory/userFactory');        
        const userFactory = await UserFactory.createInstance();
        const result = await userFactory.find();

        deepStrictEqual(result, expected);

        rewireMock.disable();
    }
})()