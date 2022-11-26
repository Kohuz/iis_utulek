module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define(
    'request',
    {
      request_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      // title: {
      //   type: Sequelize.STRING,
      // },
      commentary: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      // pending, approved, rejected
      state: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      animal_name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Request;
};
