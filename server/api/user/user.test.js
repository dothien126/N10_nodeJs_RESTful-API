const { request } = require('express');
const Jest = require('jest');
const router = require('./user.route');

const testData = {
    user: {
      userName: 'admin',
      age: 25,
      password: '123456',
      email: 'admin99@gmail.com',
      job: 'admin'
    }
  }

describe('testing for each api', () => {
  it('create a new user /users', () => {
    // run test
    test('should response with a 200 status code', async (done) => {
      const response = await request(router)
        .post('/users/register')
        .set('content-type', 'application/json')
        .send({
          username: testData.user.userName,
          age: testData.user.userName,
          email: testData.user.userName,
          password: testData.user.userName,
          job: testData.user.userName,
        })
          expect(response).to.have.status(201);
          done();
    });

    test('return 400 error when email is already registered', async (done) => {
        const response = await request(router)
          .post('/users/register')
          .set('content-type', 'application/json')
          .send({
            username: testData.user.userName,
            age: testData.user.userName,
            email: testData.user.userName,
            password: testData.user.userName,
            job: testData.user.userName,
          })
            expect(response).to.have.status(400)
            done()
        });
    });
});
