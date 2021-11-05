const { authJwt } = require('../middleware');
const { checkDuplicateUsernameOrEmail } = require('../middleware/verifySignUp');
const controller = require('../controllers/user.controller');

module.exports = function userRoute(app) {
  app.use(function route(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // get user by id
  app.get('/api/v1/users/:id', [authJwt.verifyToken], controller.findOne);

  // create user
  app.post(
    '/api/v1/users',
    [authJwt.verifyToken, checkDuplicateUsernameOrEmail],
    controller.create
  );

  // update a user with id
  app.put('/api/v1/users/:id', [authJwt.verifyToken], controller.update);
};
