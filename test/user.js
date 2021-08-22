/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../server');
const userDetails = require('./user.json');
const expect = chai.expect;
const token = '';
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

/*
 POST API test for login
    */
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

/*
 POST API test for Fogot-Password
    */
describe('forgot-password', () => {
  it('givenValidDataItShould_makePOSTRequestforForgotPassword_andReturnStatusCodeAs200', (done) => {
    const forgetPassword = userDetails.user.userforgetPassword;
    chai.request(server)
      .post('/forgot-passowrd')
      .send(forgetPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('User email id exist and reset link sent successfully');
        done();
      });
  });
  it('givenInvalidDataItShould_makePOSTRequestforForgotPassword_andReturnStatusCodeAs400', (done) => {
    const forgetPassword = userDetails.user.userforgetPasswordNotregistered;
    chai.request(server)
      .post('/forgot-passowrd')
      .send(forgetPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('please check email and try again');
        return done();
      });
  });
});
/*
 PUT API test for reset-Password
    */
describe('reset-password', () => {
  it('givenValidPasswoordAndTokenItShould_makePUTRequestforResetPassword_andReturnStatusCodeAs200', (done) => {
    const userData = userDetails.user.userResetPassword;
    // const userToken = userDetails.user.userResetPasswordToken;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklucHV0Ijp7ImVtYWlsIjoiY3ByYXJ0aGFuYTlAZ21haWwuY29tIiwiX2lkIjoiNjExZTVhZDZjNTJlNDQwZTA0MzdjZTBkIn0sImlhdCI6MTYyOTYwNjg5NSwiZXhwIjoxNjI5NjA5ODk1fQ.yyXHuleg6XC-9i3gKiG_i2ztZ-zMbt6ihB6HYUGFIFU';
    chai.request(server)
      .put('/reset-password')
      .set('Token', token)
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Your password has been reset successfully!!');
        return done();
      });
  });
  it('givenInValidTokenItShould_makePUTRequestforResetPassword_andNotResetPassword', (done) => {
    const userData = userDetails.user.userResetPassword;
    // const userToken = userDetails.user.userResetInvalidPasswordToken;
    const token = '7ImVtYWlsIjoiY3ByYXJ0aGFuYTlAZ21haWwuY29tIiwiX2lkIjoiNjExZTVhZDZjNTJlNDQwZTA0Mzd';
    chai.request(server)
      .put('/reset-password')
      .set('token', token)
      .send(userData)
      .end((error, res) => {
        if (error) {
          expect(error).to.not.null;
        }
        expect(error).to.be.null;
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('failed to reset password');
        done();
      });
  });
  it('givenEmptyTokenItShould_makePUTRequestforResetPassword_andNotResentpassword', (done) => {
    const userData = userDetails.user.userResetInvalidPassword;
    chai.request(server)
      .put('/reset-password')
      .send(userData)
      .set('Authorization', 'Bearer ' + token)
      .end((error, res) => {
        if (error) {
          expect(error).to.not.null;
        }
        expect(error).to.be.null;
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please enter valid field');
        done();
      });
  });
});
