module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('event', {
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
