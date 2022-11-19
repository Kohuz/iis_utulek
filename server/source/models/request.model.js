const user = require('user.model');
const animal = require('animal.model');

module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define('request', {
    date: {
      type: Sequelize.DATEONLY,
    },
    commentary: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    // pending, approved, rejected
    state: {
      type: Sequelize.STRING,
    },
  });

  // Relations
  Request.belongsTo(
    user(sequelize, Sequelize),
    (relation = {
      as: 'user',
      foreignKey: 'user_id',
    })
  );

  Request.belongsTo(
    animal(sequelize, Se),
    (relation = {
      as: 'animal',
      foreignKey: 'animal_id',
    })
  );

  return Request;
};
