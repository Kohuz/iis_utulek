const config = require('config');
const Sequelize = require('sequlize');

const server = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    config.object
);

const database = {
    runner : Sequelize,
    server : server,
};

// Models instantiation:
// Example:
// const SomethingModel = require('./something.model.js');
// database.something = SomethingModel(server, Sequelize);

module.exports = database;
