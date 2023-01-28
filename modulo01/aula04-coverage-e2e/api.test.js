const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API Test Suite', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP Status 200', async () => {
            const response = await request(app)
                .get('/contact')
                .expect(200);

            assert.deepStrictEqual(response.text, 'Contact us!');
        });        
    });

    describe('/hello', () => {
        it('should request an inexistent route /hi and redirect to /hello', async () => {
            const response = await request(app)
                .get('/hi')
                .expect(200);

            assert.deepStrictEqual(response.text, 'Hello World!');
        });
    });

    describe('/login', () => {
        it('should login successfully on the login route and return HTTP Status 200', async () => {
            const response = await request(app)
                .post('/login')
                .send({ 
                    username: 'OtavioPetry',
                    password: '123456',
                })
                .expect(200);

            assert.deepStrictEqual(response.text, 'Login has succeeded!');
        });

        it('should deny authorization when the request has wrong credentials and return HTTP Status 401', async () => {
            const response = await request(app)
                .post('/login')
                .send({ 
                    username: 'XuxaDaSilva',
                    password: '123456',
                })
                .expect(401);

            assert.deepStrictEqual(response.text, 'Login has failed.');
        });
    });
});