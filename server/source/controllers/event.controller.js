const database = require('../models');
const url = require('url');
const token = require('../helpers/token');

const USER = {
  debug: {
    log: (msg) => {
      console.log('user:', msg);
    },
  },
};

exports.create = (req, res) => {
  USER.debug.log('create called');
  res.status(500).send({ message: 'Not implemented!' });
};

exports.delete = (req, res) => {
  USER.debug.log('delete called');
  res.status(500).send({ message: 'Not implemented!' });
};

exports.update = (req, res) => {
  USER.debug.log('update called');
  res.status(500).send({ message: 'Not implemented!' });
};

exports.findAll = (req, res) => {
  USER.debug.log('find all called');
  res.status(500).send({ message: 'Not implemented!' });
};

exports.getSchedule = (req, res) => {
  USER.debug.log('get schedule called');
  res.status(500).send({ message: 'Not implemented!' });
};
