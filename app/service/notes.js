const notesModel = require('../models/notes');

class Service {
  createNotes (data, callback) {
    notesModel.create(data, callback);
  }

  /**
      * @description this function is written to trigger or call the models function
      * @param {*} notesId
      * @param {*} notesData
      * @returns error if it has error else data
      */
  async updateNote (notesId, notesData) {
    try {
      return await notesModel.updateNote(notesId, notesData);
    } catch (error) {
      return error;
    }
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
