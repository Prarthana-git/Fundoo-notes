/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../server');
const userDetails = require('./user.json');
const expect = chai.expect;
const notesInput = require('./notes.json');
// Assertion style
chai.should();
chai.use(chaihttp);

let token = ' ';
beforeEach((done) => {
  const userData = userDetails.user.login;
  chai
    .request(server)
    .post('/login')
    .send(userData)
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
* Positive and Negative - Creation of Notes
*/
describe('Notes API', () => {
  it('givenDataIsValid_shouldCreateNewNote', (done) => {
    const Data = notesInput.notesCreate;
    chai.request(server)
      .post('/createnotes')
      .send(Data)
      .set('token', token)
      .end((error, res) => {
        if (error) {
          expect(error).not.to.be.null;
        }
        res.should.have.status(201);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Notes Created!');
        done();
      });
  });
  it('givenInValidNotesDescription_shouldFailToCreateNote', (done) => {
    const Data = notesInput.InvalidNotesDescription;
    chai.request(server)
      .post('/createnotes')
      .send(Data)
      .set('token', token)
      .end((error, res) => {
        if (error) {
          expect(error).not.to.be.null;
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter Valid Details');
        done();
      });
  });
  it('givenInValidNotesTitle_shouldFailToCreateNote', (done) => {
    const Data = notesInput.InvalidNotesTitle;
    chai.request(server)
      .post('/createnotes')
      .send(Data)
      .set('token', token)
      .end((error, res) => {
        if (error) {
          expect(error).not.to.be.null;
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter Valid Details');
        done();
      });
  });
  it('givenDetails_WhenNotPassingToken_shouldNotCreateNotes', (done) => {
    chai.request(server)
      .get('/notes/notes')
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(404);
        return done();
      });
  });
  /**
     * /GET request test
     * Positive and Negative - Get all Notes from database
     */
  describe('GET all /notes', () => {
    it('givenValidDetails_shouldGETRequestToGetAllNotes', (done) => {
      chai.request(server)
        .get('/getnotes')
        .set('token', token)
        .end((error, res) => {
          if (error) {
            return done(error);
          }
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Retrieved Notes');
          return done();
        });
    });

    it('givenDetails_WhenNotPassingToken_shouldNotGetAllNotes', (done) => {
      chai.request(server)
        .get('/getnotes')
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
      * Updating a single contact using ID into database
      */
  describe('PUT /note/:notesId', () => {
    it('givenUpdateNoteDetailswithInvalidTitle_shouldReturnFailsToMakePutRequestToCreateNote', (done) => {
      chai.request(server)
        .put('/note/6127ba141580844794032e1f')
        .send(notesInput.notesPutNoTitle)
        .set('token', token)
        .end((error, res) => {
          if (error) {
            return done(error);
          }
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Enter Valid Details');
          return done();
        });
    });

    it('givenUpdateNoteDetailswithInvalidDescription_shouldFailsToMakePUtRequestToCreateNote', (done) => {
      chai.request(server)
        .put('/note/6127ba141580844794032e1f')
        .send(notesInput.notesPutNoDescription)
        .set('token', token)
        .end((error, res) => {
          if (error) {
            return done(error);
          }
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Enter Valid Details');
          return done();
        });
    });

    it('givenDetails_WhenNotPassingToken_shouldNotUpdateNotes', (done) => {
      chai.request(server)
        .get('/notes/notes')
        .end((error, res) => {
          if (error) {
            return done(error);
          }
          res.should.have.status(404);
          res.body.should.be.a('object');
          return done();
        });
    });
  });
  /**
     * /DELETE request test
     * Positive and Negative - Deleting a single contact using ID into database
     */
  describe('delete/:notesId', () => {
    it('givenValidData_shouldDeleteInDB', (done) => {
      chai.request(server)
        .delete('/deletenote/6127ba141580844794032e1f')
        .send(notesInput.notesDelPos)
        .set('token', token)
        .end((error, res) => {
          if (error) {
            return done(error);
          }
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Deleted Notes successfully');
          return done();
        });
    });
  });
});
