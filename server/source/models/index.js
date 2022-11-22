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

database.user.hasMany(database.event, {
  foreignKey: 'user_id',
  as: 'events',
});
database.event.belongsTo(database.user, {
  foreignKey: 'user_id',
  as: 'user',
});

database.user.hasMany(database.request, {
  foreignKey: 'user_id',
  as: 'requests',
});
database.request.belongsTo(database.user, {
  foreignKey: 'user_id',
  as: 'user',
});

database.animal.hasMany(database.event, {
  foreignKey: 'animal_id',
  as: 'events',
});
database.event.belongsTo(database.animal, {
  foreignKey: 'animal_id',
  as: 'animal',
});

database.animal.hasMany(database.request, {
  foreignKey: 'animal_id',
  as: 'requests',
});
database.request.belongsTo(database.animal, {
  foreignKey: 'animal_id',
  as: 'animal',
});

module.exports = database;
