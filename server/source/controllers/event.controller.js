const database = require('../models');
const url = require('url');
const token = require('../helpers/token');
const moment = require('moment');
const { Op } = require('sequelize');

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

exports.deleteById = (req, res) => {
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

exports.updateById = (req, res) => {
  EVENT.debug.log('update called');

  const id = req.params.id;

  database.event
    .update(req.body, {
      where: { event_id: id },
    })
    .then((retCode) => {
      if (retCode == 1) {
        res.send({
          message: 'Event was updated successfully!',
        });
      } else {
        res.status(400).send({
          message: 'Cannot update Event with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not update Event with id=' + id,
      });
    });
};

exports.findAllForAnimal = (req, res) => {
  EVENT.debug.log('find all for animal called');
  const id = req.params.id;

  database.animal
    .findByPk(id, { include: ['events'] })
    .then((animal) => {
      if (animal === null || animal.events === null) {
        res.status(404).send({
          message: 'Animal not found',
        });
      } else {
        res.status(200).send(animal.events);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Failed to get events for animal ' + err,
      });
    });
};

exports.getSchedule = (req, res) => {
  EVENT.debug.log('get schedule called');
  const hour = 60 * 60 * 1000;
  const day = 24 * hour;

  const id = req.params.id;
  let from = new Date();
  let to = new Date(from.getTime() + 14 * day);

  database.animal
    .findByPk(id, {
      include: [
        {
          model: database.event,
          where: {
            start: {
              [Op.gte]: from,
            },
            stop: {
              [Op.lte]: to,
            },
          },
          order: [['start', 'ASC']],
          as: 'events',
          required: false,
        },
      ],
    })
    .then((animal) => {
      let from = new Date();
      let to = new Date(from.getTime() + 14 * day);

      EVENT.debug.log(animal);
      if (animal === null || animal.events === null) {
        res.status(404).send({
          message: 'Animal not found',
        });
        return;
      }

      let events = animal.events;
      let days = [];

      from = from.getTime();
      to = to.getTime();

      for (let now = from; now < to; now += hour) {
        let now_date = moment(new Date(now));

        let last_day = days.length === 0 ? '' : days[days.length - 1].day;
        let now_day = now_date.locale('cs').format('dddd');

        if (now_day !== last_day) {
          days.push({
            day: now_day,
            hours: [],
          });
        }

        let event_types = [];
        let start = now;
        let stop = now + hour;

        events.forEach((e) => {
          let overlaps_with_current_hour =
            (start >= e.start && start <= e.stop) ||
            (stop >= e.start && stop <= e.stop) ||
            (e.start >= start && e.start <= stop) ||
            (e.stop >= start && e.stop <= stop);

          if (overlaps_with_current_hour) {
            event_types.push(e.type);
          }
        });

        days[days.length - 1].hours.push({
          time: now_date.hour(),
          events: event_types,
          can_walk:
            event_types.includes(eventType.can_walk) && event_types.length == 1,
        });
      }

      res.status(200).send(days);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Failed to get schedule for animal ' + err,
      });
    });
};
