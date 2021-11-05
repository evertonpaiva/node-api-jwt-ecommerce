const { authJwt } = require('../middleware');
const controller = require('../controllers/message.controller');

module.exports = function messageRoute(app) {
  app.use(function route(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // get message by id and deal id
  app.get(
    '/api/v1/deals/:deal_id/messages/:message_id',
    [],
    controller.findOne
  );

  // get messages from a deal id
  app.get('/api/v1/deals/:deal_id/messages', [], controller.findByDeal);

  // create a message of a deal
  app.post(
    '/api/v1/deals/:deal_id/messages',
    [authJwt.verifyToken],
    controller.create
  );

  // update a message with id and deal id
  app.put(
    '/api/v1/deals/:deal_id/messages/:message_id',
    [authJwt.verifyToken],
    controller.update
  );
};
