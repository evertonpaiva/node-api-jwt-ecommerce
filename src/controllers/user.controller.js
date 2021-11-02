const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

// Format user data
formatUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    login: user.login,
    password: user.password,
    location: {
      lat: user.lat,
      lng: user.lng,
      address: user.address,
      city: user.city,
      state: user.state,
      zip_code: user.zip_code,
    },
  };
};

// Find a user by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        formattedUser = formatUser(data);

        res.send({
          user: formattedUser,
        });
      } else {
        res.status(404).send({
          error: 'User with id=' + id + ' not found.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: 'Error retrieving User with id=' + id,
      });
    });
};
