const database = require("../models");
const url = require("url");
const token = require("../helpers/token");

const ANIMAL = {
  debug: {
    log: (msg) => {
      console.log("animal:", msg);
    },
  },
};

exports.create = (req, res) => {
  ANIMAL.debug.log("create called");

  const animal = {
    name: req.body.name,
    type: req.body.type,
    commentary: req.body.commentary ?? "",
    age: req.body.age,
    borrowed: "false",
  };

  database.animal
    .create(animal)
    .then((data) => {
      res.status(200).send({
        message: "Animal created successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
      });
    });
};

exports.borrowed = (req, res) => {
  ANIMAL.debug.log('borrowed called');

  database.animal
    .findAll({
      where: {
        borrowed: true,
      },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving animals',
      });
    });
};

exports.findAll = (req, res) => {
  ANIMAL.debug.log("find all called");
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
        message: err.message || "Some error occurred while retrieving animals",
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  database.animal
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find animal with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving animal with id=" + id,
      });
    });
};

exports.deleteById = (req, res) => {
  ANIMAL.debug.log("delete called");

  const id = req.params.id;

  database.animal
    .destroy({
      where: { animal_id: id },
    })
    .then((retCode) => {
      if (retCode == 1) {
        res.send({
          message: "Animal was deleted successfully!",
        });
      } else {
        res.status(400).send({
          message: "Cannot delete Animal with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Animal with id=" + id,
      });
    });
};
