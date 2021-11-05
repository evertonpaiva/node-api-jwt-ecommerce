const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
  let token = null;
  // default header
  let tokenBearer = req.headers['authorization'];
  if (tokenBearer) {
    token = tokenBearer.replace('Bearer ', '');
  } else {
    // try to get token from x-acess-token
    token = req.headers['x-access-token'];
  }

  if (!token) {
    return res.status(403).send({
      error: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
