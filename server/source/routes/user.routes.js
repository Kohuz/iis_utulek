module.exports = (app) => {
  const user = require('../controllers/user.controller');
  const router = require('express').Router();

  router.post('/', user.create);

  router.post('/login', user.login);

  // invalidate token
  router.post('/logout', user.logout);

  router.put('/:id(\\d+)', user.updateById);

  router.delete('/:id(\\d+)', user.deleteById);

  // Add that it could be done with email in documentation
  router.delete('/clean', user.deleteNonRegistered);

  router.get('/:id(\\d+)', user.findById);

  router.get('/', user.findAll);

  router.get('/authenticate', user.authenticate);

  router.get('/unverified', user.findAllUnverifiedCount);

  app.use('/api/v1/user', router);
};
