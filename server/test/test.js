const pmApp = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const mongoose = require('mongoose');
mongoose.connection.dropCollection('users');

chai.use(chaiHttp);

const user = {
  username: 'yakhousam',
  email: 'yakhousam@mymail.com',
  password: 'mypassword'
};
let token;
let userId;

describe('USER TEST', function() {
  // this.timeout(5000);
  it('POST Create a User', function(done) {
    chai
      .request(pmApp)
      .post('/register')
      .send(user)
      .end((err, response) => {
        should.equal(201, response.status);
        done();
      });
  });
  it('POST Login', function(done) {
    chai
      .request(pmApp)
      .post('/login')
      .send(user)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.have.property('token');
        response.body.should.have.property('id');
        token = response.body.token;
        userId = response.body.id;

        done();
      });
  });
});
