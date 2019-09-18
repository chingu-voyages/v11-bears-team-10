const pmApp = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

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
let todoID;

describe('TEST PROJECT Collection ', function() {
  before(function() {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany();
    }
  });
  describe('creating users', function() {
    it('', function(done) {
      User.insertMany([userOne, userTwo, userThree], (err, docs) => {
        if (err) throw err;
        [userOne, userTwo, userThree].forEach((user, i) => {
          user.id = docs[i]._id;
          user.token =
            'bearer ' +
            jwt.sign({ id: userOne.id }, 'my secret', {
              expiresIn: 60 * 60 * 24
            });
        });
        done();
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
              user.projectList[0]._id.should.equal(projectOne._id);

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

  describe('TEST UPDATE PROJECT - URI = /porject', function() {
    it('PUT PROJECT - ADD TODO LIST - Route = /project/:project-id - should return 200', function(done) {
      projectOne.todos.unshift({
        title: 'my new todo',
        description: 'awesom todo list'
      });
      chai
        .request(pmApp)
        .put(`/project/${projectOne._id}`)
        .send(projectOne)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          const project = response.body.project;
          project.todos[0].title.should.equal(projectOne.todos[0].title);
          projectOne = {...project}
          todoID = project.todos[0]._id;

          done();
        });
    });

    it('PUT PROJECT - ADD A USER TO THE TEAM ARRAY - Route = /project/:project-id - should return 200', function(done) {
      projectOne.team.unshift({ _id: userTwo.id, username: userTwo.username });
      chai
        .request(pmApp)
        .put(`/project/${projectOne._id}`)
        .send(projectOne)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          const project = response.body.project;
          project.team[0]._id.should.equal(projectOne.team[0]._id.toString());
          // console.log(project);
          projectOne = {...project}
          done();
        });
    });

    it('PUT PROJECT - ADD A USER TO ASSIGN ARRAY IN THE TODO LIST - Route = /project/:project-id - should return 200', function(done) {
      // console.log('projectone =', projectOne)
      projectOne.todos.find(todo => todo._id === todoID).assigned_users.unshift({
        _id: userTwo.id,
        username: userTwo.username
      });
      chai
        .request(pmApp)
        .put(`/project/${projectOne._id}`)
        .send(projectOne)
        .set({ Authorization: userOne.token })
        .end((err, response) => {
          response.status.should.equal(200);
          const project = response.body.project;
          project.team[0]._id.should.equal(projectOne.team[0]._id.toString());
          // console.log(project);
          projectOne = {...project}
          done();
        });
    });
  });

  // after(function() {
  //   for (let i in mongoose.connection.collections) {
  //     mongoose.connection.collections[i].deleteMany();
  //   }
  // });
});
