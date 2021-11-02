const db = require('../models');
const User = db.user;
const bcrypt = require('bcryptjs');

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

// Create a new user
exports.create = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    login: req.body.login,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
  })
    .then((user) => {
      formattedUser = formatUser(user);

      res.send({
        user: formattedUser,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
