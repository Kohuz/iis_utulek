const database = require('../models');
const url = require('url');
const token = require('../helpers/token');

const EVENT = {
  debug: {
    log: (msg) => {
      console.log('event:', msg);
    },
  },
};

exports.create = (req, res) => {
  EVENT.debug.log('create called');

  const event = {
    date: new Date(),
    commentary: req.body.commentary,
    type: req.body.type,
    start: req.body.start,
    stop: req.body.stop,
    state: req.body.state ?? 'pending',
    animal_id: req.body.animal_id,
    user_id: req.body.user_id,
  };

  database.event
    .create(event)
    .then((data) => {
      res.status(200).send({
        message: 'Event created successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Sorry, some error occurred' + err,
      });
    });
};

exports.delete = (req, res) => {
  EVENT.debug.log('delete called');
  const id = req.params.id;

  database.event
    .destroy({
      where: { event_id: id },
    })
    .then((retCode) => {
      if (retCode == 1) {
        res.send({
          message: 'Event was deleted successfully!',
        });
      } else {
        res.status(400).send({
          message: 'Cannot delete Event with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Event with id=' + id,
      });
    });
};

exports.update = (req, res) => {
  EVENT.debug.log('update called');
  res.status(500).send({ message: 'Not implemented!' });
};

exports.findAll = (req, res) => {
  EVENT.debug.log('find all called');
  USER.debug.log('find all called');
  res.status(500).send({ message: 'Not implemented!' });
};

exports.getSchedule = (req, res) => {
  EVENT.debug.log('get schedule called');
  res.status(500).send({ message: 'Not implemented!' });
};
