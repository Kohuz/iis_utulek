const database = require('../models');
const url = require('url');
const token = require('../helpers/token');

const ANIMAL = {
  debug: {
    log: (msg) => {
      console.log('animal:', msg);
    },
  },
};

exports.create = (req, res) => {
  ANIMAL.debug.log('create called');

  const animal = {
    name: req.body.name,
    type: req.body.type,
    commentary: req.body.commentary ?? '',
    age: req.body.age,
    borrowed: 'false',
  };

  database.animal
    .create(animal)
    .then((data) => {
      res.status(200).send({
        message: 'Animal created successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Sorry, some error occurred' + err,
      });
    });
};
exports.findAll = (req, res) => {
  ANIMAL.debug.log('find all called');
  ANIMAL.debug.log(req.query);

  const UrlQuery = req.query;
  database.animal
    .findAll({
      where: UrlQuery,
    })
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
exports.delete = (req, res) => {
  ANIMAL.debug.log('delete called');
  res.status(501).send();
  return;

  database.animal.destroy({
    where: {
      verified: false,
    },
  });

  res.status(200).send();
};
