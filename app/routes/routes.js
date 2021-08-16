
module.exports = (app) => {
  const controller = require('../controllers/user');
  // api for register user
  app.post('/register', controller.register);

  // api for login user
  app.post('/login', controller.login);
};
