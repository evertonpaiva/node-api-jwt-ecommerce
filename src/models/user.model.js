module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.DOUBLE,
    },
    lng: {
      type: Sequelize.DOUBLE,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zip_code: {
      type: Sequelize.INTEGER,
    },
  });
  return User;
};
