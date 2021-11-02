const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

// Find a user by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({
          user: data,
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
