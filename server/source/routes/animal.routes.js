module.exports = (app) => {
  const animal = require('../controllers/animal.controller');
  const router = require('express').Router();

  router.post('/', animals.create);

  // takes boolean
  router.post('/borrowed', animals.borrowed);

  router.delete('/', animals.delete);

  router.put('/', animals.update);

  router.get('/', animals.findAll);

  app.use('/api/v1/animal', router);
};
