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
        // test if bid belogs to deal
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

// Update a bid by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Bid.findByPk(id)
    .then((data) => {
      if (data) {
        // update the record
        Bid.update(req.body, {
          where: { id: id },
        })
          .then((bid) => {
            // retrieve updated record from database
            Bid.findByPk(id).then((updatedBid) => {
              formattedBid = formatDeal(updatedBid);

              res.send({
                deal: formattedBid,
              });
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              error: 'Error updating Bid with id=' + id,
            });
          });
      } else {
        res.status(404).send({
          error: 'Bid with id=' + id + ' not found.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: 'Error retrieving Bid with id=' + id,
      });
    });
};
