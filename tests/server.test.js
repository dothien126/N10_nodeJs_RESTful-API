process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect();
const should = chai.should();

const user = {
  username: 'admin',
  age: 25,
  password: '123456',
  email: 'admin99@gmail.com',
  job: 'admin',
};

chai.use(chaiHttp);

describe('POST users/register', () => {
  it('return status 200 when user register successfully', (done) => {
    // run test
    chai
      .request(app)
      .post('users/register')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: user.username,
        age: user.age,
        email: user.email,
        password: user.password,
        job: user.job,
      })
      .end((err, res) => {
        expect(res).should.have.status(201);
        expect(res.body).should.have.property('data');
        done();
      });
  });

  //   it('return status 400 when email is already registered', (done) => {
  //     // run test
  //     chai
  //       .request(router)
  //       .post('/register')
  //       .set('content-type', 'application/x-www-form-urlencoded')
  //       .send(user)
  //       .end((err, res) => {
  //         if(err) return done(err);
  //         expect(res).should.have.status(400);
  //         expect(res.body).should.have.property('message');
  //       }).timeout(10000);
  //       done()
  //   });

  //   it('return status 400 when data user format is incorrect', (done) => {
  //     // run test
  //     chai
  //       .request(router)
  //       .post('/register')
  //       .set('content-type', 'application/x-www-form-urlencoded')
  //       .send(user)
  //       .end((err, res) => {
  //         if(err) return done(err);
  //         expect(res).should.have.status(400);
  //         expect(res.body).should.have.property('message');
  //       }).timeout(10000);
  //       done()
  //   });

  //   it('return status 400 when data user format is not required', (done) => {
  //     // run test
  //     chai
  //       .request(router)
  //       .post('/register')
  //       .set('content-type', 'application/x-www-form-urlencoded')
  //       .send(user)
  //       .end((err, res) => {
  //         if(err) return done(err);
  //         expect(res).should.have.status(400);
  //         expect(res.body).should.have.property('message');
  //       }).timeout(10000);
  //       done()
  //   });
});
