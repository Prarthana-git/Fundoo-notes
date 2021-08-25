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

  updateNote (notesId, notesData) {
    try {
      NoteModel.findByIdAndUpdate(notesId.notesId, {
        title: notesData.title,
        description: notesData.description
      }, { new: true });
    } catch (error) {
      return error;
    }
  }
}

module.exports = new ModelNotes();
