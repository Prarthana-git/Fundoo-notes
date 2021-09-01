/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const labelInput = require('./label.json');
const userDetails = require('./user.json');

// assertion style
chai.should();
chai.use(chaiHttp);

let token = '';
beforeEach((done) => {
  chai.request(server)
    .post('/login')
    .send(userDetails.user.login)
    .end((error, res) => {
      if (error) {
        return done(error);
      }
      token = res.body.token;
      done();
    });
});

/**
     * /POST request test
 */
describe('POST labels /create', () => {
  it('givenCreteLabelDetails_shouldmakePOSTRequestAndCreateLabel', (done) => {
    chai.request(server)
      .post('/createLabel/6127caa81a1d083b34671300')
      .send(labelInput.labelCreate)
      .set('token', token)
      .end((error, res) => {
        res.should.have.status(201);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Label Created!');
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it('givenDetails_AndNotPassingToken_shouldNotCreateLable', (done) => {
    chai.request(server)
      .post('/createLabel/6127caa81a1d083b34671300')
      .send(labelInput.labelCreate)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Authorisation failed! Invalid user');
        return done();
      });
  });

  it('givenLabelId_whenNoNotesId_shouldNotAbleToDeletTheLabel', (done) => {
    chai.request(server)
      .post('/createLabel')
      .send(labelInput.labelCreateWithNoNotesId)
      .set('token', token)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(404);
        res.body.should.be.a('object');
        return done();
      });
  });

  it('givenLabelDetails_WhenEmptyLabel_shouldNotCreateLable', (done) => {
    chai.request(server)
      .post('/createLabel/6127caa81a1d083b34671300')
      .send(labelInput.EmptylabelCreate)
      .set('token', token)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Enter Valid Details');
        return done();
      });
  });
});
/**
     * /GET request test
     */
describe('GET all /Labels', () => {
  it('givenValidDetails_shouldGETRequestToGetAllLabels', (done) => {
    chai.request(server)
      .get('/AllLabels')
      .set('token', token)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Retrieved Labels');
        return done();
      });
  });

  it('givenDetails_NotPassingToken_shouldNotGetAllLabels', (done) => {
    chai.request(server)
      .get('/AllLabels')
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Authorisation failed! Invalid user');
        return done();
      });
  });
});

/**
          * /PUT request test
          */
describe('PUT /updateLabel/:Labeld', () => {
  it('givenUpdateLabelDetails_shouldMakePUTRequestToUpdateLable', (done) => {
    chai.request(server)
      .put('/updateLabel/6127caa81a1d083b34671300')
      .send(labelInput.lablePut)
      .set('token', token)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('label updated successfully.!!');
        return done();
      });
  });

  it('givenWrongLabelId_shouldNotAbleToUpdateTheLabel', (done) => {
    chai.request(server)
      .put('/updateLabel/6127caa81a1d083b346710')
      .send(labelInput.EmptylabelCreate)
      .set('token', token)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Enter Valid Details');
        return done();
      });
  });

  it('givenLabel_withNoNotesId_shouldNotAbleToDeletTheLabel', (done) => {
    chai.request(server)
      .put('/updateLabel')
      .send(labelInput.lablePut)
      .set('token', token)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(404);
        res.body.should.be.a('object');
        return done();
      });
  });

  it('givenDetails_WithNotPassingToken_shouldNotUpdateLable', (done) => {
    chai.request(server)
      .put('/updateLabel/6127caa81a1d083b34671300')
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Authorisation failed! Invalid user');
        return done();
      });
  });
});

/**
         * /DELETE request test
         */
describe('delete/:labelId', () => {
  it('givenValidData_shouldDeleteInDB', (done) => {
    chai.request(server)
      .delete('/deletelabel/6127caa81a1d083b34671300')
      .set('token', token)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Deleted Label successfully');
        return done();
      });
  });
});
