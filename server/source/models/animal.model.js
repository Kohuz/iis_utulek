module.exports = (sequelize, Sequelize) => {
  const Animal = sequelize.define(
    'animal',
    {
      animal_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
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
      borrowed: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
  return Animal;
};
