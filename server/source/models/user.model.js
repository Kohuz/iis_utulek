const event = require('event.model');
const request = require('request.model');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
    birth_date: {
      type: Sequelize.DATEONLY,
    },
    password: {
      type: Sequelize.STRING,
    },
    bank_account: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    is_volunteer: {
      type: Sequelize.BOOLEAN,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
    },
    is_caretaker: {
      type: Sequelize.BOOLEAN,
    },
    is_veterinarian: {
      type: Sequelize.BOOLEAN,
    },
    // For volunteers, that they are verified
    verified: {
      type: Sequelize.BOOLEAN,
    },
  });

  // Relations
  User.hasMany(
    event(sequelize, Sequelize),
    (relation = {
      through: 'user_event',
      as: 'events',
      foreignKey: 'event_id',
    })
  );

  User.hasMany(
    request(sequelize, Sequelize),
    (relation = {
      through: 'user_request',
      as: 'requests',
      foreignKey: 'request_id',
    })
  );

  return User;
};
