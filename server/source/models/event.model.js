const user = require('user.model');
const animal = require('animal.model');

module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    date: {
      type: Sequelize.DATEONLY,
    },
    commentary: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    start : {
      type: Sequelize.DATETIME,
    },
    stop : {
      type: Sequelize.DATETIME,
    },
  });

  // Relations
  Event.belongsTo(user(sequelize, Sequelize), relation = {
    as : "user",
    foreignKey : "user_id",
  });

  Event.belongsTo(animal(sequelize, Se), relation = {
      as : "animal",
      foreignKey : "animal_id",
  });

  return Event;
};
