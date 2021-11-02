const { authJwt } = require('../middleware');
const controller = require('../controllers/bid.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // get bid by id and deal id
  app.get('/api/v1/deals/:deal_id/bids/:bid_id', [], controller.findOne);

  // get bids from a deal id
  app.get('/api/v1/deals/:deal_id/bids', [], controller.findByDeal);

  // create a bid of a deal
  app.post(
    '/api/v1/deals/:deal_id/bids',
    [authJwt.verifyToken],
    controller.create
  );

  // update a bid with id and deal id
  app.put(
    '/api/v1/deals/:deal_id/bids/:bid_id',
    [authJwt.verifyToken],
    controller.update
  );
};
