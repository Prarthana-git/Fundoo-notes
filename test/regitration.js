const chai = require('chai')
const chaihttp = require('chai-http')
const server = require('../server')
const userDetails = require('./user.json')

// Assertion style
chai.should()
chai.use(chaihttp)

/*
 POST API test for registeration
    */
describe('register', () => {
  it('givenValidDataItShould_makePOSTRequestAndRegisterUser_andReturnsStatusCodeAs201', (done) => {
    const userData = userDetails.user.register
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(true)
        res.body.should.have.property('message').eql('User Registered')
        res.body.should.have.property('data').should.be.a('object')
        done()
      })
  })

  it('givenRegistrationData_whennofirstNamegiven_shouldNoteSaveitinDatabase', (done) => {
    const userData = userDetails.user.registerwithnofirstName
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(error)
        }
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(false)
        res.body.should.have.property('message').eql('Please Enter Valid Fields')
        done()
      })
  })
  it('givenRegistrationData_whennolastNamegiven_shouldNoteSaveitinDatabase', (done) => {
    const userData = userDetails.user.registerwithnofirstName
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(error)
        }
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(false)
        res.body.should.have.property('message').eql('Please Enter Valid Fields')
        done()
      })
  })
  it('givenRegistrationData_whennoemailIDgiven_shouldNoteSaveitinDatabase', (done) => {
    const userData = userDetails.user.registerwithnoemailId
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(error)
        }
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(false)
        res.body.should.have.property('message').eql('Please Enter Valid Fields')
        done()
      })
  })
  it('givenRegistrationData_whennopasswordgiven_shouldNoteSaveitinDatabase', (done) => {
    const userData = userDetails.user.registrationWithNoPassword
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          return done(error)
        }
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(false)
        res.body.should.have.property('message').eql('Please Enter Valid Fields')
        done()
      })
  })
})
