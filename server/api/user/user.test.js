const chai = require('chai');
const chaiHttp = require('chai-http');
const router = require('./user.route');

const expect = chai.expect;
const should = chai.should();

const user = {
  userName: 'admin',
  age: 25,
  password: '123456',
  email: 'admin99@gmail.com',
  job: 'admin',
};

chai.use(chaiHttp);

describe('POST /users', () => {
  it('create a new user /users', (done) => {
    // run test
    chai
      .request(router)
      .post('/users')
      .set('content-type', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(err).should.be.null;
        expect(res).should.have.status(201);
        expect(res.body).should.have.property('data');
        expect(res.body).should.be.a('array');
        done();
      });

    // test('return 400 error when email is already registered', async (done) => {
    //     const response = await request(router)
    //       .post('/users/register')
    //       .set('content-type', 'application/json')
    //       .send({
    //         username: testData.user.userName,
    //         age: testData.user.userName,
    //         email: testData.user.userName,
    //         password: testData.user.userName,
    //         job: testData.user.userName,
    //       })
    //         expect(response).to.have.status(400)
    //         done()
    //     });
  });
});
