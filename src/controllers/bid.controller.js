const db = require('../models');
const Bid = db.bid;

// Format bid data
formatBid = (bid) => {
  return {
    user_id: bid.user_id,
    accepted: bid.accepted,
    value: bid.value,
    description: bid.description,
  };
};

// Find a bid by id
exports.findOne = (req, res) => {
  const bid_id = req.params.bid_id;
  const deal_id = req.params.deal_id;

  Bid.findByPk(bid_id)
    .then((data) => {
      if (data) {
        // check if provided bid_id belogs to deal_id
        if (data.deal_id != deal_id) {
          res.status(404).send({
            error:
              'Bid with id=' +
              bid_id +
              ' does not belongs to Deal with id=' +
              deal_id +
              '.',
          });
        } else {
          formattedBid = formatBid(data);

          res.send({
            bid: formattedBid,
          });
        }
      } else {
        res.status(404).send({
          error: 'Bid with id=' + bid_id + ' not found.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: 'Error retrieving Bid with id=' + bid_id,
      });
    });
};

// Find bids from a deal
exports.findByDeal = (req, res) => {
  const deal_id = req.params.deal_id;

  Bid.findAll({
    where: {
      deal_id: deal_id,
    },
  })
    .then((result) => {
      // array of records
      let bids = [];

      // formating data to respond
      result.forEach((b) => {
        formattedBid = formatBid(b);
        bids.push({ bid: formattedBid });
      });

      res.send(bids);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving Bids with Deal id=' + deal_id,
      });
    });
};

// Create a new bid
exports.create = (req, res) => {
  const deal_id = req.params.deal_id;

  // Save Bid to Database
  Bid.create({
    user_id: req.body.user_id,
    accepted: req.body.accepted,
    value: req.body.value,
    description: req.body.description,
    deal_id: deal_id,
  })
    .then((bid) => {
      formattedBid = formatBid(bid);

      res.send({
        bid: formattedBid,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

// Update a bid by the id and a deal id
exports.update = (req, res) => {
  const bid_id = req.params.bid_id;
  const deal_id = req.params.deal_id;

  Bid.findByPk(bid_id)
    .then((data) => {
      if (data) {
        // check if provided bid_id belogs to deal_id
        if (data.deal_id != deal_id) {
          res.status(404).send({
            error:
              'Bid with id=' +
              bid_id +
              ' does not belongs to Deal with id=' +
              deal_id +
              '.',
          });
        } else {
          // update the record
          Bid.update(req.body, {
            where: { id: bid_id },
          })
            .then((bid) => {
              // retrieve updated record from database
              Bid.findByPk(bid_id).then((updatedBid) => {
                formattedBid = formatBid(updatedBid);

                res.send({
                  deal: formattedBid,
                });
              });
            })
            .catch((err) => {
              res.status(500).send({
                error: 'Error updating Bid with id=' + bid_id,
              });
            });
        }
      } else {
        res.status(404).send({
          error: 'Bid with id=' + id + ' not found.',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving Bid with id=' + bid_id,
      });
    });
};