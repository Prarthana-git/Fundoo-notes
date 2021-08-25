
module.exports = (app) => {
  const helper = require('../middleware/helper');
  const noteController = require('../controllers/notes');
  const userController = require('../controllers/user');
  // api for register user
  app.post('/register', userController.register);

  // api for login user
  app.post('/login', userController.login);

  // api for forgot-password
  app.post('/forgot-passowrd', userController.forgotPassword);

  // api for forgot-password
  app.put('/reset-password', userController.resetPassword);

  // notes CRUD api
  app.post('/createnotes', helper.verifyToken, noteController.createNotes);

  app.put('/note/:notesId', helper.verifyToken, noteController.updateNote);
};
