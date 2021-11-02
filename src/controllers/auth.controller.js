const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signin = (req, res) => {
  User.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          error: 'Invalid Password!',
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        token: token,
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};
