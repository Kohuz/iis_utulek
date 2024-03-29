module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      bank_account: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      is_volunteer: {
        type: Sequelize.BOOLEAN,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
      },
      is_caretaker: {
        type: Sequelize.BOOLEAN,
      },
      is_veterinarian: {
        type: Sequelize.BOOLEAN,
      },
      // For volunteers, that they are verified
      verified: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
};
