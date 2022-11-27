const database = require('../models');
const url = require('url');
const webtoken = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize');

const EVENT = {
  debug: {
    log: (msg) => {
      console.log('event:', msg);
    },
  },
};

const eventType = {
  walk: 'walk',
  can_walk: 'can_walk',
  exam: 'examination',
};
exports.eventType = eventType;

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

exports.createOnDay = (req, res) => {
  EVENT.debug.log('create on day called');

  let consequent_hours = []; // e.g. [[1,2,3], [6,7,8], [10,11], [13]]
  let hours = req.body.hours.sort((a, b) => a - b);

  hours.forEach((h) => {
    if (consequent_hours.length == 0) {
      consequent_hours.push([h]);
      return;
    }

    let last_sequence = consequent_hours[consequent_hours.length - 1];
    let last_hour = last_sequence[last_sequence.length - 1];

    if (h - last_hour != 1) {
      consequent_hours.push([h]);
    } else {
      last_sequence.push(h);
      consequent_hours[consequent_hours.length - 1] = last_sequence;
    }
  });

  let events_to_create = consequent_hours.map((a) => {
    let start_hour = a[0].toString();
    let end_hour = a[a.length - 1].toString();

    let start = moment.tz(
      req.body.day + ' ' + start_hour + ':00',
      'Europe/Prague'
    );
    let end = moment.tz(req.body.day + ' ' + end_hour + ':59', 'Europe/Prague');

    let event = Object.assign({}, req.body.event);
    event.start = start.toDate();
    event.stop = end.toDate();

    return event;
  });

  database.event
    .bulkCreate(events_to_create)
    .then((d) => {
      res.status(200).send({
        message: 'Events created successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Sorry, some error occurred' + err,
      });
    });
};

exports.findAll = (req, res) => {
  EVENT.debug.log('find all called');
  EVENT.debug.log(req.query);

  database.event
    .findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users',
      });
    });
};

exports.addWalkDays = (req, res) => {
  EVENT.debug.log('add walk days called');

  // verify was already done
  var user_token = webtoken.decode(req.headers['authorization'].split(' ')[1]);

  let events_to_create = req.body.map((day) => {
    let start = moment.tz(day + ' 00:00', 'Europe/Prague');
    let end = moment.tz(day + ' 23:59', 'Europe/Prague');

    return {
      commentary: 'Available for walks',
      type: eventType.can_walk,

      date: start.toDate(),
      start: start.toDate(),
      stop: end.toDate(),

      animal_id: req.params.id,
      user_id: user_token.id,
    };
  });

  database.event
    .destroy({
      where: {
        type: 'can_walk',
        animal_id: req.params.id,
      },
    })
    .then((_) => {
      database.event
        .bulkCreate(events_to_create)
        .then((d) => {
          res.status(200).send({
            message: 'Walk schedule replaced successfully!',
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Sorry, some error occurred' + err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Sorry, some error occurred' + err,
      });
    });
};

exports.getWalkDays = (req, res) => {
  EVENT.debug.log('add walk days called');
  let now = moment.tz('Europe/Prague').startOf('day');
  let day = 24 * 60 * 60 * 1000;
  let future_days_to_get = 30;

  database.animal
    .findByPk(req.params.id, {
      include: {
        model: database.event,
        where: {
          type: eventType.can_walk,
          stop: {
            [Op.gte]: now,
          },
          start: {
            [Op.lte]: now + future_days_to_get * day,
          },
        },
        as: 'events',
      },
    })
    .then((d) => {
      if (d === null || d.events === null) {
        res.status(404).send({
          message: 'Animal not found',
        });
        return;
      }

      let events = d.events;
      let result = new Array(future_days_to_get).fill(false);

      events.forEach((event) => {
        let start_day = Math.floor((event.start - now) / day);
        let end_day = Math.floor((event.stop - now) / day);

        for (let day = start_day; day <= end_day; day++) {
          if (day >= 0 && day < result.length) {
            result[day] = true;
          }
        }
      });

      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not get walk days: ' + err,
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
    .findByPk(id, {
      include: {
        model: database.event,
        include: 'animal',
        as: 'events',
      },
    })
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

exports.findAllForUser = (req, res) => {
  EVENT.debug.log('find all for user called');
  const id = req.params.id;

  database.user
    .findByPk(id, {
      include: [
        {
          model: database.event,
          include: 'animal',
          as: 'events',
        },
      ],
    })
    .then((user) => {
      if (user === null || user.events === null) {
        res.status(404).send({
          message: 'User not found',
        });
      } else {
        res.status(200).send(user.events);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Failed to get events for user ' + err,
      });
    });
};

exports.getSchedule = (req, res) => {
  EVENT.debug.log('get schedule called');
  const hour = 60 * 60 * 1000;
  const day = 24 * hour;

  const id = req.params.id;
  let from = new Date();
  let to = new Date(from.getTime() + 30 * day);

  database.animal
    .findByPk(id, {
      include: [
        {
          model: database.event,
          where: {
            stop: {
              // Get all events that have not ended yet
              [Op.gte]: from,
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
      let to = moment(new Date(from.getTime() + 30 * day));

      EVENT.debug.log(animal);
      if (animal === null || animal.events === null) {
        res.status(404).send({
          message: 'Animal not found',
        });
        return;
      }

      let events = animal.events;
      let days = [];

      from = from.valueOf();
      to = to.valueOf();

      for (let now = from; now < to; now += hour) {
        let now_date = moment(new Date(now));
        now_date.minutes(0);
        now_date.seconds(0);
        now_date.milliseconds(0);

        let last_day = days.length === 0 ? '' : days[days.length - 1].day;
        let now_day = now_date.tz('Europe/Prague').locale('cs').format('dddd');

        if (now_day !== last_day) {
          days.push({
            day: now_day,
            hours: [],
          });
        }

        let event_types = [];
        let hstart = now_date.valueOf();
        let hstop = hstart + hour;

        events.forEach((e) => {
          let estart = e.start;
          let estop = e.stop;

          let event_begins_this_hour = estart >= hstart && estart < hstop;
          let event_ends_this_hour = estop > hstart && estop < hstop;
          let hour_begins_in_event = hstart >= estart && hstart < estop;
          let hour_ends_in_event = hstop > estart && hstop < estop;

          let overlaps_with_current_hour =
            event_begins_this_hour ||
            event_ends_this_hour ||
            hour_begins_in_event ||
            hour_ends_in_event;

          if (overlaps_with_current_hour) {
            event_types.push(e.type);
          }
        });

        let now_hour = now_date.tz('Europe/Prague').hour();

        if (now_hour >= 8 && now_hour <= 17) {
          days[days.length - 1].hours.push({
            time: now_hour,
            events: event_types,
            can_walk:
              event_types.includes(eventType.can_walk) &&
              event_types.length == 1,
          });
        }
      }

      res.status(200).send(days);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Failed to get schedule for animal ' + err,
      });
    });
};
