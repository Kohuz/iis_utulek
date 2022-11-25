const database = require('../models');
const url = require('url');
const token = require('../helpers/token');

const REQUEST = {
  debug: {
    log: (msg) => {
      console.log('animal:', msg);
    },
  },
};

exports.create = (req, res) => {
  REQUEST.debug.log('create called');

  const request = {
    name: new Date(),
    type: req.body.type,
    commentary: req.body.commentary ?? '',
    state: 'pending',
    animal_id: req.body.animal_id,
    user_id: req.body.user_id,
  };

  database.request
    .create(request)
    .then((data) => {
      res.status(200).send({
        message: 'Request created successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Sorry, some error occurred' + err,
      });
    });
};

exports.findAll = (req, res) => {
  REQUEST.debug.log('find all called');
  REQUEST.debug.log(req.query);

  database.request
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving animals',
      });
    });
};
exports.getPendingCount = (req, res) => {
  REQUEST.debug.log('find all called');
  REQUEST.debug.log(req.query);

  database.request
    .findAll({
      where: {
        state: 'pending',
      },
    })
    .then((data) => {
      res.send(data.length);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving animals',
      });
    });
};
exports.getPending = (req, res) => {
  REQUEST.debug.log('find all called');
  REQUEST.debug.log(req.query);

  database.request
    .findAll({
      where: {
        state: 'pending',
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving animals',
      });
    });
};

exports.findAllwithId = (req, res) => {
  EVENT.debug.log('find all for user called');
  const id = req.params.id;

  database.user
    .findByPk(id, { include: ['requests'] })
    .then((user) => {
      if (user === null || user.events === null) {
        res.status(404).send({
          message: 'user not found',
        });
      } else {
        res.status(200).send(user.requests);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Failed to get events for user ' + err,
      });
    });
};

exports.deleteById = (req, res) => {
  REQUEST.debug.log('delete called');

  const id = req.params.id;

  database.request
    .destroy({
      where: { request_id: id },
    })
    .then((retCode) => {
      if (retCode == 1) {
        res.send({
          message: 'Request was deleted successfully!',
        });
      } else {
        res.status(400).send({
          message: 'Cannot delete Request with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Request with id=' + id,
      });
    });
};

exports.updateById = (req, res) => {
  REQUEST.debug.log('update called');

  const id = req.params.id;

  database.request
    .update(req.body, {
      where: { request_id: id },
    })
    .then((retCode) => {
      if (retCode == 1) {
        res.send({
          message: 'Request was updated successfully!',
        });
      } else {
        res.status(400).send({
          message: 'Cannot update Request with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not update Request with id=' + id,
      });
    });
};
