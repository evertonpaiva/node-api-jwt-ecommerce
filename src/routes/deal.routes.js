const { authJwt } = require('../middleware');
const controller = require('../controllers/deal.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // get deal by id
  app.get('/api/v1/deals/:id', [authJwt.verifyToken], controller.findOne);

  // update a deal with id
  app.put('/api/v1/deals/:id', [authJwt.verifyToken], controller.update);
};
