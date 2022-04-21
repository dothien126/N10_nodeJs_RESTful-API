const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Purpose for testing API', () => {
  describe('POST /users/register ', () => {
    
    it('return status 201 when user register successful', (done) => {
      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'what',
          age: 12,
          email: 'what99@gmail.vn',
          password: '123321',
          job: 'abc',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('return status 400 data user is not correct', (done) => {
      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'what',
          age: 12,
          email: 'what99@gmail.vn',
          password: '123321',
          job: 'abc',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('return status 400 user email is already', (done) => {
      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'what',
          age: 12,
          email: 'what99@gmail.vn',
          password: '123321',
          job: 'abc',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('return status 400 user data user is null', (done) => {
      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'what',
          age: 12,
          email: 'what99@gmail.vn',
          password: '123321',
          job: 'abc',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

  });
});
