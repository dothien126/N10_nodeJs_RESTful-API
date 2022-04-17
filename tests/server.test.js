const { request } = require('express');
const Jest = require('jest');
const server = require('../app.js');

describe('testing for each api', () => {
    describe('testing for each api', () => {
        it('create a new user /users', () => {
            // run test
            test('should response with a 200 status code', async () => {
                const response = await request(server)
                .post('test/users')
                .send({
                    username: 'admin',
                    age: 25,
                    email: 'admin123@gmail.com',
                    password: '12345',
                    job: 'admin'
                })
                expect(response.statusCode).toBe(200)
            })

        });
    });

});
