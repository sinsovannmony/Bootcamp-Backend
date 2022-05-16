module.exports = (app) => {
  const userController = require('../controllers/user.controller');
  const checkToken = require('../middlewares/checkToken');
  var router = require('express').Router();
  app.use('/api/user', router);

  router.post('/register/',userController.register);
  router.post('/login/', userController.login);
  router.post('/refresh-token',userController.refresh_token);
  router.get('/secure',checkToken ,userController.security)
};
