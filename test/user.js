/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../server');
const userDetails = require('./user.json');

// Assertion style
chai.should();
chai.use(chaihttp);

/*
 POST API test for registeration
    */
describe('register', () => {
  it('givenValidDataItShould_makePOSTRequestAndRegisterUser_andReturnsStatusCodeAs201', (done) => {
    const userData = userDetails.user.register;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('User Registered');
        res.body.should.have.property('data').should.be.a('object');
        done();
      });
  });

  it('givenEmptyFirstName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
    const userData = userDetails.user.registerwithnofirstName;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please Enter Valid Fields');
        done();
      });
  });
  it('givenEmptyLastName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
    const userData = userDetails.user.registerwithnofirstName;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please Enter Valid Fields');
        done();
      });
  });
  it('givenEmptyEmail_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
    const userData = userDetails.user.registerwithnoemailId;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please Enter Valid Fields');
        done();
      });
  });
  it('givenEmptypassword_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
    const userData = userDetails.user.registrationWithNoPassword;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please Enter Valid Fields');
        done();
      });
  });
});

describe('login', () => {
  it('givenValidDataItShould_makePOSTRequestToLoginUser_andReturnTokenAndStatusCodeAs200', (done) => {
    const loginData = userDetails.user.login;
    chai.request(server)
      .post('/login')
      .send(loginData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('User successfully logined In');
        res.body.should.have.property('token');
        done();
      });
  });

  it('givenInvalidEmailItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
    const loginData = userDetails.user.loginwithwrongEmail;
    chai.request(server)
      .post('/login')
      .send(loginData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('please check email and password and try again');
        done();
      });
  });
  it('givenEmptyStringInemailItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
    const loginData = userDetails.user.loginwithnoEmail;
    chai.request(server)
      .post('/login')
      .send(loginData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('please check inserted fields');
        res.body.should.have.property('data').should.be.a('object');
        done();
      });
  });
  it('givenEmptyStringInPasswordItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
    const loginData = userDetails.user.loginwithnoPassword;
    chai.request(server)
      .post('/login')
      .send(loginData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('please check inserted fields');
        res.body.should.have.property('data').should.be.a('object');
        done();
      });
  });
  it('givenInvaliStringInPasswordItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
    const loginData = userDetails.user.loginwrongPassword;
    chai.request(server)
      .post('/login')
      .send(loginData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('please check email and password and try again');
        done();
      });
  });
});
