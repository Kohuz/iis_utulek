module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('event', {
    event_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    commentary: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    start: {
      type: Sequelize.DATETIME,
    },
    stop: {
      type: Sequelize.DATETIME,
    },
    state: {
      type: Sequelize.STRING,
    },
  });
  return Event;
};
