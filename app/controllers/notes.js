const noteService = require('../service/notes');
const { notesValidation } = require('../middleware/validation');

class NotesController {
  createNotes (req, res) {
    try {
      const infoValidation = notesValidation.validate(req.body);
      if (infoValidation.error) {
        return res.status(400).send({
          message: infoValidation.error.details[0].message
        });
      }
      const notesData = {
        title: req.body.title,
        description: req.body.description
      };
      const notesCreate = noteService.createNotes(notesData);
      res.send({
        success: true,
        message: 'Notes Created!',
        data: notesCreate
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Error while creating notes'
      });
    }
  }

  updateNote (req, res) {
    try {
      const notesId = req.params.notesId;
      const noteData = {
        title: req.body.title,
        description: req.body.description
      };
      const updatedNote = noteService.updateNote(notesId, noteData);
      return res.status(200).send({
        success: true,
        message: 'Note updated successfully.!!',
        data: updatedNote
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  getAllNotes (req, res) {
    noteService.getAllNotes((error, notesData) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: 'Some error occured'
        });
      }
      res.status(200).send({
        success: true,
        message: 'Retrieved Notes',
        data: notesData
      });
    });
  }

  getOne (req, res) {
    const notesId = req.params.notesId;
    noteService.getNoteById(notesId, (error, noteData) => {
      if (error) {
        return res.status(400).send({
          success: false,
          message: 'Note not found'
        });
      } else {
        return res.status(200).send({
          success: true,
          message: 'Retrieved Note',
          data: noteData
        });
      }
    });
  }

  deleteNotes (req, res) {
    try {
      const notesId = req.params.notesId;
      noteService.deleteNotes(notesId, (error, noteData) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: 'Note not deleted'
          });
        } else {
          return res.status(200).send({
            success: true,
            message: 'Deleted Notes successfully',
            data: noteData
          });
        }
      });
    } catch (error) {
      return (error);
    }
  }
}
module.exports = new NotesController();
