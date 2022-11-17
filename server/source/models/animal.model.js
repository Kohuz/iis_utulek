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

  return Animal;
};
