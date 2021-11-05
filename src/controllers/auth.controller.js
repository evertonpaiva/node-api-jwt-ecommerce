const db = require('../models');
const config = require('../config/auth.config');

const User = db.user;
const Token = db.token;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          error: 'Invalid Password!',
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        token,
        user,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

exports.ssoSignin = (req, res) => {
  User.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: 'User Not found.' });
      }

      Token.findOne({
        where: {
          token: req.body.app_token,
        },
      })
        .then((token) => {
          if (!token) {
            return res.status(404).send({ error: 'Token not found.' });
          }

          if (token.user_id != user.id) {
            return res
              .status(401)
              .send({ error: 'The provided token does not belongs to user.' });
          }

          if (!token.active) {
            return res
              .status(401)
              .send({ error: 'The provided token is not active.' });
          }

          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });

          res.status(200).send({
            token,
            user,
          });
        })
        .catch((err) => {
          return res
            .status(500)
            .send({ error: `Error while searching for token ${err.message}` });
        });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};
