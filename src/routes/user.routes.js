const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // get user by id
  app.get('/api/v1/users/:id', [authJwt.verifyToken], controller.findOne);

  // create user
  app.post('/api/v1/users', [authJwt.verifyToken], controller.create);
};
