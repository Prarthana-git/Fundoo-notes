const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timesstamps: true
});

const NoteModel = mongoose.model('Note', noteSchema);

class ModelNotes {
  create (data) {
    const note = new NoteModel({
      title: data.title,
      description: data.description
    });
    return note.save();
  }

  updateNote (notesData, callback) {
    NoteModel.findByIdAndUpdate(notesData.noteId, {
      title: notesData.title,
      description: notesData.description
    }, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  }

  getAllNotes (callback) {
    NoteModel.find({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  }

  deleteNotes (noteId, callback) {
    try {
      NoteModel.findByIdAndRemove(noteId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  }
}

module.exports = new ModelNotes();
