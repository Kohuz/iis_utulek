const config = require('./config');
const Sequelize = require('sequelize');

const databaseInstance = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  config.options
);

const database = {
  instance: databaseInstance,
  driver: Sequelize,
};

// Models instantiation:
// Example:
// const SomethingModel = require('./something.model.js');
// database.something = SomethingModel(server, Sequelize);

const UserModel = require('./user.model');
database.user = UserModel(database.instance, database.driver);

const EventModel = require('./event.model');
database.event = EventModel(database.instance, database.driver);

const AnimalModel = require('./animal.model');
database.animal = AnimalModel(database.instance, database.driver);

const RequestModel = require('./request.model');
database.request = RequestModel(database.instance, database.driver);

module.exports = database;
