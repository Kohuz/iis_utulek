module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define('request', {
    request_id: {
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
    // pending, approved, rejected
    state: {
      type: Sequelize.STRING,
    },
  });
  return Request;
};
