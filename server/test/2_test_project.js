const pmApp = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const mongoose = require('mongoose');
//  mongoose.connection.dropCollection('users');
//  mongoose.connection.dropCollection('projects');
// Array.from(mongoose.connection.collections).forEach( (collection, i) =>{
//   mongoose.connection.collections[i].remove(function(){})
// mongoose.connection.dropCollection(collection)
// })
// console.log(mongoose.connection.collections)

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
const userThree = {
  id: '',
  username: 'yakhousam3',
  email: 'yakhousam3@mymail.com',
  password: 'mypassword3',
  token: ''
};
let projectOne = {};

// [userOne, userTwo, userThree].forEach(async (user, i, arr) => {
//   try {
//     const response = await chai
//       .request(pmApp)
//       .post('/register')
//       .send(user);
//     if (response) {
//       response.status.should.equal(201);
//       user.id = response.body.user._id;
//       user.token = 'bearer ' + response.body.token;
//       // console.log('user create =', userOne)
//       if(i === arr.length -1) done()
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

describe('TEST PROJECT Collection ', function() {
  before(function() {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany();
    }
  });
  describe('creating users', function() {
    it('POST - /user - should return 201', function(done) {
      chai
        .request(pmApp)
        .post('/register')
        .send(userOne)
        .end((err, response) => {
          should.equal(201, response.status);
          response.body.should.have.property('user');
          response.body.should.have.property('token').not.be.empty;
          userOne.id = response.body.user._id;
          userOne.token = 'bearer ' + response.body.token;

          chai
            .request(pmApp)
            .post('/register')
            .send(userTwo)
            .end((err, response) => {
              should.equal(201, response.status);
              userTwo.id = response.body.user._id;
              userTwo.token = 'bearer ' + response.body.token;

              chai
                .request(pmApp)
                .post('/register')
                .send(userThree)
                .end((err, response) => {
                  should.equal(201, response.status);
                  userThree.id = response.body.user._id;
                  userThree.token = 'bearer ' + response.body.token;
                  done();
                });
            });
        });
    });
  });

  describe('TEST PROJECT CREATION - URI = /project', function() {
    it('POST - Route = /project - User can create a project - should return 201', function(done) {
      // console.log('token =', userOne.token);
      chai
        .request(pmApp)
        .post(`/project/${userOne.id}`)
        .set({ Authorization: userOne.token })
        .send({ title: 'project one', description: 'this is my first project' })
        .end((err, response) => {
          response.status.should.equal(201);
          response.body.should.have.property('project');
          projectOne = { ...response.body.project };

          chai
            .request(pmApp)
            .get(`/user/${userOne.id}`)
            .set({ Authorization: userOne.token })
            .end((err, response) => {
              response.status.should.equal(200);
              const user = response.body.user;
              user.should.have.property('projectList').that.include(projectOne._id)

              done();
            });
        });
    });
  });

  describe('TEST GET PROJECT - URI = /project', function() {
    it('GET ALL USER PROJECTS BY USER ID - Route = /project/user/:user-id - should return 200', function(done) {
      chai
        .request(pmApp)
        .get(`/project/user/${userOne.id}`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.should.have.property('projects');
          const projects = response.body.projects;
          projects.should.be.an('array');
          projects[0].should.have.property('_id');
          projects[0].should.have.property('title');
          projects[0].should.have.property('admin');

          // console.log('projects = ', response.body)

          done();
        });
    });
    it('GET PROJECT BY ID - Route = /project/:project-id - should return 200', function(done) {
      chai
        .request(pmApp)
        .get(`/project/${projectOne._id}`)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.should.have.property('project');
          const project = response.body.project;
          project.should.have.property('_id').equal(projectOne._id);
          project.should.have.property('title').equal(projectOne.title);

          done();
        });
    });
  });

  after(function() {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany();
    }
  });
});
