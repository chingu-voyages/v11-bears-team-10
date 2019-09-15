const pmApp = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const mongoose = require('mongoose');
// mongoose.connection.dropCollection('users');
// for (let i in mongoose.connection.collections) {
//   mongoose.connection.collections[i].deleteMany({});
// }

chai.use(chaiHttp);

const userOne = {
  id: '',
  username: 'yakhousam',
  email: 'yakhousam@mymail.com',
  password: 'mypassword',
  token: ''
};
const userTwo = {
  id: '',
  username: 'yakhousam2',
  email: 'yakhousam2@mymail.com',
  password: 'mypassword2',
  token: ''
};

describe('TEST User collectiion', function() {
  before(function(){
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany();
    }
  })
  // this.timeout(5000);
  describe('TEST REGISTRATION - URI = /register', function(){
    it('POST - /register - User can register an account - should return 201', function(done) {
      chai
        .request(pmApp)
        .post('/register')
        .send(userOne)
        .end((err, response) => {
          should.equal(201, response.status);
          response.body.should.have.property('user')
          response.body.should.have.property('token')
          userOne.id = response.body.user._id;
          userOne.token = 'bearer ' + response.body.token;
          // done();
        });
      chai
        .request(pmApp)
        .post('/register')
        .send(userTwo)
        .end((err, response) => {
          should.equal(201, response.status);
          userTwo.id = response.body.user._id;
          userTwo.token = 'bearer ' + response.body.token;
          done();
        });
    });
    it('POST - /register - User cannot register an account with an existing Username - should return 401', function(done) {
      const { username,  password } = userOne;
      chai
        .request(pmApp)
        .post('/register')
        .send({ username, email:'a@a.com', password })
        .end((err, response) => {
          should.equal(401, response.status);
          done();
        });
    });
    it('POST - /register - User cannot register an account with an existing Email - should return 401', function(done) {
      const { email,  password } = userOne;
      chai
        .request(pmApp)
        .post('/register')
        .send({ username: 'john', email, password })
        .end((err, response) => {
          should.equal(401, response.status);
          done();
        });
    });
  })

  describe('TEST LOGIN - URI = /login', function(){
    it('POST - /login - User that has an account can login - should return 200 ', function(done) {
      chai
        .request(pmApp)
        .post('/login')
        .send(userOne)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.should.have.property('token');
          response.body.should.have.property('user');
          // userOne.token = 'bearer ' + response.body.token;
  
          done();
        });
    });
    it('POST - /login - User that has not an account cannot login - should return 401', function(done) {
      chai
        .request(pmApp)
        .post('/login')
        .send({username: 'BobMarley', password:'heaven'})
        .end((err, response) => {
          response.status.should.equal(401);
          done();
        });
    });
  })

  describe('TEST GET - URI = /user', function(){
    it('GET - /user - Retrieve All Users - should retrun 200', function(done) {
      chai
        .request(pmApp)
        .get('/user')
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.should.have.property('users');
          const users = response.body.users;
          users.should.be.an('array');
          users[0].should.have.property('_id');
          users[0].should.have.property('username');
  
          done();
        });
    });

    it('GET - /user/{user-id} - Retrieve existing user by ID - should return 200', function(done) {
      chai
        .request(pmApp)
        .get(`/user/${userOne.id}`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          const user = response.body.user;
          user.should.have.property('_id').equal(userOne.id);
          user.should.have.property('username').equal(userOne.username);
  
          done();
        });
    });
    
    it('GET - /user/username/{username} - Retrieve existing user by username - should return 200', function(done) {
      chai
        .request(pmApp)
        .get(`/user/username/${userOne.username}`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          const user = response.body.user;
          user.should.have.property('_id').equal(userOne.id);
          user.should.have.property('username').equal(userOne.username);
  
          done();
        });
    });

    it('GET - /user/email/{email} - Retrieve existing user by email - should return 200', function(done) {
      chai
        .request(pmApp)
        .get(`/user/email/${userOne.email}`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          const user = response.body.user;
          user.should.have.property('_id').equal(userOne.id);
          user.should.have.property('email').equal(userOne.email);
  
          done();
        });
    });

    it('GET - /user/{user-id} - Retrieve a user by ID that do not exist - should return 404' , function(done) {
      const  id = mongoose.Types.ObjectId();
      chai
        .request(pmApp)
        .get(`/user/${id}`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(404);
            
          done();
        });
    });

    it('GET - /user/username - Retrieve a user by username that do not exist - should return 404' , function(done) {
      chai
        .request(pmApp)
        .get(`/user/username/chewbacca`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(404);
            
          done();
        });
    });

    it('GET - /user/email - Retrieve a user by email that do not exist - should return 404' , function(done) {
      chai
        .request(pmApp)
        .get(`/user/email/chewbacca@mail.com`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(404);
            
          done();
        });
    });
  })

  describe('TEST UPDATE USER - URI = /user', function(){
    it('PUT - /user/{user-id} - User can update his account - should return 200', function(done) {
      const updateUser = { ...userOne, lastName: 'Doe', firstName: 'John' };
      chai
        .request(pmApp)
        .put(`/user/${userOne.id}`)
        .set({ Authorization: userOne.token })
        .send(updateUser)
        .end((err, response) => {
          response.status.should.equal(200);
  
          done();
        });
    });

    it('PUT - /user/{user-id} - User cannot update other user account - should return 401', function(done) {
      const updateUser = { ...userOne, lastName: 'Doe', firstName: 'John' };
      chai
        .request(pmApp)
        .put(`/user/${userOne.id}`)
        .set({ Authorization: userTwo.token })
        .send(updateUser)
        .end((err, response) => {
          response.status.should.equal(401);
  
          done();
        });
    });

    it('PUT - /user/{user-id} - User cannot update his username if the username is already used by someone else - should return 401', function(done) {
      chai
        .request(pmApp)
        .put(`/user/${userOne.id}`)
        .set({ Authorization: userOne.token })
        .send({username: userTwo.username})
        .end((err, response) => {
          response.status.should.equal(401);
  
          done();
        });
    });

    it('PUT - /user/{user-id} - User cannot update his email if the email is already used by someone else - should return 401', function(done) {
      chai
        .request(pmApp)
        .put(`/user/${userOne.id}`)
        .set({ Authorization: userOne.token })
        .send({email: userTwo.email})
        .end((err, response) => {
          response.status.should.equal(401);
  
          done();
        });
    });
  })

  describe('TEST DELETE USER ACCOUNT - URI = /user', function(){
    it(`DELETE - /user/{user_id} - User cannot delete other User account, should return 401`, function(done) {
      chai
        .request(pmApp)
        .delete(`/user/${userTwo.id}`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(401);
  
          done();
        });
    });
    it('DELETE - /user/{user_id} - User can delete his account, should return 200 ', function(done) {
      chai
        .request(pmApp)
        .delete(`/user/${userTwo.id}`)
        .set({ Authorization: userTwo.token })
        .end((err, response) => {
          response.status.should.equal(200);
  
          done();
        });
    });
  })
  after(function() {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany();
    }
  });
});



