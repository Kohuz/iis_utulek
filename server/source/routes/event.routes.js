module.exports = (app) => {
  const events = require('../controllers/event.controller');
  const router = require('express').Router();

  router.post('/', events.create);

  router.delete('/:id(\\d+)', events.deleteById);

  router.put('/:id(\\d+)', events.updateById);

  // Add parameter for user ID and animal ID, it should work the same as
  // for request (althrough there is animal).
  // For user filter out only walks.
  router.get('/animal/:id(\\d+)', events.findAllForAnimal);

  // Return this structure for animal, it should be for 2 weeks ahead.
  /* {
            "day": "pondělí",
            "hours": [
                {
                    "time": 8,
                    "can_walk": false,
                    "events": ["exam"], // e.g vaccination
                },
                {
                    "time": 9,
                    "can_walk": false,
                    "events": ["exam"], // vaccination
                },
                {
                    "time": 10,
                    "can_walk": true, 
                    "events": ["can_walk"], // vaccination has ended
                },
                {
                    "time": 11,
                    "can_walk": true,
                    "events": ["can_walk"],
                }
            ]
        }, */

  router.get('/animal/:id(\\d+)/schedule', events.getSchedule);

  app.use('/api/v1/event', router);
};
