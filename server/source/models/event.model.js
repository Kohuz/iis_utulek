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

  return Event;
};
