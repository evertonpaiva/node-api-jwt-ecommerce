const controller = require('../controllers/auth.controller');

module.exports = function authRote(app) {
  app.use(function route(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // user and pass sigin
  app.post('/api/v1/authenticate', controller.signin);

  // user and sso siging
  app.post('/api/v1/authenticate/sso', controller.ssoSignin);
};
