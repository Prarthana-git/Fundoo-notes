
module.exports = (app) => {
  const helper = require('../middleware/helper');
  const noteController = require('../controllers/notes');
  const userController = require('../controllers/user');
  const labelController = require('../controllers/label');
  // api for register user
  app.post('/register', userController.register);

  // api for login user
  app.post('/login', userController.login);

  // api for forgot-password
  app.post('/forgot-passowrd', userController.forgotPassword);

  // api for reset-password
  app.put('/reset-password', userController.resetPassword);

  // notes CRUD api
  app.post('/createnotes', helper.verifyToken, noteController.createNotes);
  app.put('/note/:notesId', helper.verifyToken, noteController.updateNote);
  app.get('/getnotes', helper.verifyToken, noteController.getAllNotes);
  app.get('/note/:noteId', helper.verifyToken, noteController.getOne);
  app.delete('/deletenote/:notesId', helper.verifyToken, noteController.deleteNotes);

  // labels CRUD api
  app.post('/createLabel/:notesId', helper.verifyToken, labelController.createLabel);
  app.get('/AllLabels', helper.verifyToken, labelController.getAllLabels);
  app.get('/label/:labelId', helper.verifyToken, labelController.getOne);
  app.put('/updateLabel/:labelId', helper.verifyToken, labelController.updateLabel);
  app.delete('/deletelabel/:labelId', helper.verifyToken, labelController.deleteLabel);
};
