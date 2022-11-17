const event = require('event.model');
const request = require('request.model');

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
    state: {
      type: Sequelize.STRING,
    },
  });

  // Relations
  Animal.hasMany(event(sequelize, Sequelize), relation = {
    through : "animal_event",
    as : "events",
    foreignKey : "event_id",
  });

  Animal.hasMany(request(sequelize, Sequelize), relation = {
    through : "animal_request",
    as : "requests",
    foreignKey : "requests_id",
  });

  return Animal;
};
