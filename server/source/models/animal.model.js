const event = require('event.model');

module.exports = (sequelize, Sequelize) => {
  const Animal = sequelize.define("animal", {
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    commentary: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
  });

  // Relations
  Animal.hasMany(event(sequelize, Sequelize), relation = {
    through : "animal_event",
    as : "events",
    foreignKey : "event_id",
  });

  return Animal;
};
