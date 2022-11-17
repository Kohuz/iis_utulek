module.exports = (sequelize, Sequelize) => {
  const AnimalEvent = sequelize.define("animal_event", {
    date: {
      type: Sequelize.DATEONLY,
    },
    commentary: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  });

  return AnimalEvent;
};
