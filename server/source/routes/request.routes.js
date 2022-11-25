module.exports = (app) => {
  const request = require('../controllers/request.controller');
  const router = require('express').Router();

  router.post('/', request.create);

  router.delete('/:id(\\d+)', request.deleteById);

  router.put('/:id(\\d+)', request.updateById);

  // add parameter, that if ID is provided, send back only those requests
  // associated with such ID (authors ID).
  router.get('/', request.findAll);

  //user id
  router.get('/:id(\\d+)', request.findAllwithId);

  // filter out Requests that are pending, send their IDs
  router.get('/pending', request.getPending);

  router.get('/pending/count', request.getPendingCount);

  app.use('/api/v1/request', router);
};
