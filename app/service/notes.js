const notesModel = require('../models/notes');

class Service {
  createNotes (data, callback) {
    notesModel.create(data, callback);
  }

  updateNote (noteId, notesdata, callback) {
    try {
      notesModel.updateNote(noteId, notesdata, (error, data) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      return callback(error, null);
    }
  }

  getAllNotes (callback) {
    notesModel.getAllNotes((error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  }

  getNoteById (noteId, callback) {
    notesModel.getOneNote(noteId, (error, noteData) => {
      return error ? callback(error, null) : callback(null, noteData);
    });
  }

  deleteNotes (noteId, callback) {
    try {
      notesModel.deleteNotes(noteId, (error, data) => {
        if (!noteId) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      return callback(error, null);
    }
  }
}
module.exports = new Service();
