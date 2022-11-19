module.exports = {
  HOST: 'localhost',
  PORT: 6603,
  USER: 'root',
  PASSWORD: 'test',
  DB: 'utulek',
    host: HOST,
  options: {
    port: 6603,
    dialect: 'mysql',
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
