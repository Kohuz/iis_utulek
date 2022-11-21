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
  USER.debug.log('Create called');

  const user = {
    name: req.body.name,
    surname: req.body.surname,
    birth_date: req.body.birth_date,
    password: req.body.password, // TODO HASH THIS!!!!!!!
    bank_account: req.body.bank_account ?? '',
    address: req.body.address ?? '',
    is_volunteer: req.body.is_volunteer ?? false,
    is_admin: req.body.is_admin ?? false,
    is_caretaker: req.body.is_caretaker ?? false,
    is_veterinarian: req.body.is_veterinarian ?? false,
    verified: req.body.verified ?? false,
  };

  database.user
    .create(user)
    .then((data) => {
      res.status(200).send({
        message: 'User created successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Sorry, some error occurred' + err,
      });
    });
};

exports.login = (req, res) => {
  USER.debug.log('login called');

  if (req.body.login == null) {
    req.body.login = '';
  }
  if (req.body.email == null) {
    req.body.email = '';
  }

  database.user
    .findAll({
      where: {
        [database.driver.Op.or]: [
          { login: req.body.login },
          { email: req.body.email },
        ],
        password: req.body.password,
      },
    })
    .then((data) => {
      res.status(200).send({
        message: token.generateAccess(data.user_id),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Sorry, some error occurred' + err,
      });
    });
};

exports.updateById = (req, res) => {
  USER.debug.log('update called');

  const id = req.params.id;

  database.user
    .update(req.body, {
      where: { user_id: id },
    })
    .then((retCode) => {
      if (retCode == 1) {
        res.send({
          message: 'User was updated successfully!',
        });
      } else {
        res.send({
          message: 'Cannot update User with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not update User with id=' + id,
      });
    });
};

exports.deleteById = (req, res) => {
  USER.debug.log('delete called');

  const id = req.params.id;

  database.user
    .destroy({
      where: { user_id: id },
    })
    .then((retCode) => {
      if (retCode == 1) {
        res.send({
          message: 'User was deleted successfully!',
        });
      } else {
        res.send({
          message: 'Cannot delete User with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      });
    });
};

// FIXME: some other tables are related to the users, therefore we are
// constrained => perhaps we could add trigger to database?
exports.deleteNonRegistered = (req, res) => {
  USER.debug.log('delete non registered called');
  res.status(501).send();
  return;

  database.user.destroy({
    where: {
      verified: false,
    },
  });

  res.status(200).send();
};

exports.findAll = (req, res) => {
  USER.debug.log('find all called');
  USER.debug.log(req.query);

  const UrlQuery = req.query;
  database.user
    .findAll({
      attributes: { exclude: ['password'] },
      where: UrlQuery,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  database.user
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find user with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

exports.findAllUnverifiedCount = (req, res) => {
  USER.debug.log('find all unverified count called');

  database.user
    .findAll({ where: { verified: false } })
    .then((data) => {
      res.status(200).send({
        length: data.length,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving unverified count: ' + err,
      });
    });
};
