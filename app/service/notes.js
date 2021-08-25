const notesModel = require('../models/notes');

class Service {
  createNotes (data, callback) {
    notesModel.create(data, callback);
  }

  updateNote (notesId, notesdata) {
    notesModel.updateNote(notesId, notesdata);
  }
}
module.exports = new Service();
