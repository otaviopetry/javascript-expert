const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);

        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);

        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/invalid-header.csv';
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);

        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
                "name": "Erick Wendel",
                "id": 123,
                "profession": "Javascript Instructor",
                "birthYear": 1997
            },
            {
                "name": "Otavio Petry",
                "id": 456,
                "profession": "Software Developer",
                "birthYear": 1987
            },
            {
                "name": "Pietra Perroni",
                "id": 789,
                "profession": "Psicóloga",
                "birthYear": 1997
            },            
        ];

        await deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})()
