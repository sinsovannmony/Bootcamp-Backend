module.exports = (app) => {
  const userController = require('../controllers/user.controller');
  var router = require('express').Router();
  app.use('/api/user', router);

  router.post('/register/', userController.register);
  router.post('/login/', userController.login);
};
