const chai = require('chai');
const chaiHttp = require('chai-http');
const router = require('./auth.route');

// const expect = chai.expect;
chai.should();

const user = {
  userName: 'admin',
  age: 25,
  password: '123456',
  email: 'admin99@gmail.com',
  job: 'admin',
};

chai.use(chaiHttp);

describe('POST /users/register', () => {
  it('return status 201 when user register successfully', (done) => {
    // run test
    chai
      .request(router)
      .post('/users/register')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      }).timeout(10000)
      done()
  });

  // it('return status 400 when email is already registered', (done) => {
  //   // run test
  //   chai
  //     .request(router)
  //     .post('/users/register')
  //     .set('content-type', 'application/x-www-form-urlencoded')
  //     .send(user)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res).to.have.status(400);
  //       expect(res.body).to.have.property('message');
  //     })
  //     .timeout(10000);
  //   done();
  // });

  // it('return status 400 when data user format is incorrect', (done) => {
  //   // run test
  //   chai
  //     .request(router)
  //     .post('/users/register')
  //     .set('content-type', 'application/x-www-form-urlencoded')
  //     .send(user)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res).to.have.status(400);
  //       expect(res.body).to.have.property('message');
  //     })
  //     .timeout(10000);
  //   done();
  // });

  // it('return status 400 when data user format is not required', (done) => {
  //   // run test
  //   chai
  //     .request(router)
  //     .post('/users/register')
  //     .set('content-type', 'application/x-www-form-urlencoded')
  //     .send(user)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res).to.have.status(400);
  //       expect(res.body).to.have.property('message');
  //     })
  //     .timeout(10000);
  //   done();
  // });
});
