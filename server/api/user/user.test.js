const chai = require('chai');
const chaiHttp = require('chai-http');
const router = require('./user.route');

const expect = chai.expect();
const should = chai.should();

const user = {
  userName: 'admin',
  age: 25,
  password: '123456',
  email: 'admin99@gmail.com',
  job: 'admin',
};
let id = '625a9e4d52aa49e0f960879c'

chai.use(chaiHttp);

describe('GET /:userId', () => {
  it('return status 200 when userId is correct', (done) => {
    // run test
    chai
      .request(router)
      .get('/:userid')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).should.have.status(200);
        expect(res.body).should.have.property('id').eql(id)
        expect(res.body).should.have.property('data');
      })
      .timeout(10000);
    done();
  });

  it('return status 400 when when userId is incorrect', (done) => {
    // run test
    chai
      .request(router)
      .get('/:userId/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).should.have.status(400);
        expect(res.body).should.have.property('message');
      })
      .timeout(10000);
    done();
  });
});
