module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "test",
    DB: "utulek",
    object : {
      host: HOST,
      dialect: "mysql",
      operatorsAliases: 0,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
  };
