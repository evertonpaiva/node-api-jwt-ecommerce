const db = require('../models');

const Bid = db.bid;

// Format bid data
const formatBid = (bid) => {
  return {
    user_id: bid.user_id,
    accepted: bid.accepted,
    value: bid.value,
    description: bid.description,
  };
};

// Find a bid by id
const findOne = (req, res) => {
  const bidId = Number(req.params.bid_id);
  const dealId = Number(req.params.deal_id);

  Bid.findByPk(bidId)
    .then((data) => {
      if (data) {
        // check if provided bid_id belogs to deal_id
        if (data.deal_id !== dealId) {
          res.status(404).send({
            error: `Bid with id=${bidId} does not belongs to Deal with id=${dealId}.`,
          });
        } else {
          const formattedBid = formatBid(data);

          res.send({
            bid: formattedBid,
          });
        }
      } else {
        res.status(404).send({
          error: `Bid with id=${bidId} not found.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Bid with id=${bidId}`,
      });
    });
};

// Find bids from a deal
const findByDeal = (req, res) => {
  const dealId = req.params.deal_id;

  Bid.findAll({
    where: {
      deal_id: dealId,
    },
  })
    .then((result) => {
      // array of records
      const bids = [];

      // formating data to respond
      result.forEach((b) => {
        const formattedBid = formatBid(b);
        bids.push({ bid: formattedBid });
      });

      res.send(bids);
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Bids with Deal id=${dealId}`,
      });
    });
};

// Create a new bid
const create = (req, res) => {
  const dealId = req.params.deal_id;

  // Save Bid to Database
  Bid.create({
    user_id: req.body.user_id,
    accepted: req.body.accepted,
    value: req.body.value,
    description: req.body.description,
    deal_id: dealId,
  })
    .then((bid) => {
      const formattedBid = formatBid(bid);

      res.send({
        bid: formattedBid,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

// Update a bid by the id and a deal id
const update = (req, res) => {
  const bidId = Number(req.params.bid_id);
  const dealId = Number(req.params.deal_id);

  Bid.findByPk(bidId)
    .then((data) => {
      if (data) {
        // check if provided bid_id belogs to deal_id
        if (data.deal_id !== dealId) {
          res.status(404).send({
            error: `Bid with id=${bidId} does not belongs to Deal with id=${dealId}.`,
          });
        } else {
          // update the record
          Bid.update(req.body, {
            where: { id: bidId },
          })
            .then(() => {
              // retrieve updated record from database
              Bid.findByPk(bidId).then((updatedBid) => {
                const formattedBid = formatBid(updatedBid);

                res.send({
                  bid: formattedBid,
                });
              });
            })
            .catch(() => {
              res.status(500).send({
                error: `Error updating Bid with id=${bidId}`,
              });
            });
        }
      } else {
        res.status(404).send({
          error: `Bid with id=${bidId} not found.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Bid with id=${bidId}`,
      });
    });
};

module.exports = {
  findOne,
  findByDeal,
  create,
  update,
};
