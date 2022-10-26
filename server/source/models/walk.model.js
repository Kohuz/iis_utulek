module.exports = (sequelize, Sequelize) => {
  const Walk = sequelize.define("walk", {
    start_time: {
      type: Sequelize.DATE,
    },
    end_time: {
      type: Sequelize.DATE,
    },
  });

  return Walk;
};
