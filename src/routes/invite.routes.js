const { authJwt } = require('../middleware');
const controller = require('../controllers/invite.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // get invites from a user id
  app.get('/api/v1/users/:user_id/invites', [], controller.findByUser);

  // create a invite of a user
  app.post(
    '/api/v1/users/:user_id/invites',
    [authJwt.verifyToken],
    controller.create
  );
};
