const user = require('user.model');

module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("animal_event", {
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

  return Event;
};
