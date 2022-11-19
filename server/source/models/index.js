const config = require('./config');
const Sequelize = require('sequelize');

const databaseInstance = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  config.object
);

const database = {
  instance: databaseInstance,
  driver: Sequelize,
};

// Models instantiation:
// Example:
// const SomethingModel = require('./something.model.js');
// database.something = SomethingModel(server, Sequelize);

module.exports = database;
