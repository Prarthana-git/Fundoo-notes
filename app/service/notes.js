const notesModel = require('../models/notes');

class Service {
  createNotes (data, callback) {
    notesModel.create(data, callback);
  }

  updateNote (noteId, notesdata, callback) {
    notesModel.updateNote(noteId, notesdata, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  }

  getAllNotes (callback) {
    notesModel.getAllNotes((error, data) => {
      return error ? callback(error, null) : callback(null, data);
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
