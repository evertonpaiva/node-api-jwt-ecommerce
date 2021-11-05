const { authJwt } = require('../middleware');
const controller = require('../controllers/delivery.controller');

module.exports = function deliveryRoute(app) {
  app.use(function route(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // get the shipping cost from a deal
  app.get(
    '/api/v1/deals/:deal_id/deliveries',
    [authJwt.verifyToken],
    controller.findShippingCost
  );

  // create a delivery request of a deal
  app.post(
    '/api/v1/deals/:deal_id/deliveries',
    [authJwt.verifyToken],
    controller.create
  );
};
