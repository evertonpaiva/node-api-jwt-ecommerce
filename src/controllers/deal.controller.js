const db = require('../models');

const Deal = db.deal;

// Format deal data
formatDeal = (deal) => {
  return {
    type: deal.type,
    value: deal.value,
    description: deal.description,
    trade_for: deal.trade_for,
    location: {
      lat: deal.lat,
      lng: deal.lng,
      address: deal.address,
      city: deal.city,
      state: deal.state,
      zip_code: deal.zip_code,
    },
    urgency: {
      type: deal.urgency_type,
      limit_date: deal.urgency_limit_date,
    },
    photos: deal.photos,
  };
};

// Find a deal by id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Deal.findByPk(id)
    .then((data) => {
      if (data) {
        formattedDeal = formatDeal(data);

        res.send({
          deal: formattedDeal,
        });
      } else {
        res.status(404).send({
          error: `Deal with id=${id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: `Error retrieving Deal with id=${id}`,
      });
    });
};

// Create a new deal
exports.create = (req, res) => {
  // Save Deal to Database
  Deal.create({
    type: req.body.type,
    value: req.body.value,
    description: req.body.description,
    trade_for: req.body.trade_for,
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    urgency_type: req.body.urgency_type,
    urgency_limit_date: req.body.urgency_limit_date,
    photos: req.body.photos,
    user_id: req.userId,
  })
    .then((deal) => {
      formattedDeal = formatDeal(deal);

      res.send({
        deal: formattedDeal,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

// Update a deal by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  Deal.findByPk(id)
    .then((data) => {
      if (data) {
        // update the record
        Deal.update(req.body, {
          where: { id },
        })
          .then((user) => {
            // retrieve updated record from database
            Deal.findByPk(id).then((updatedDeal) => {
              formattedDeal = formatDeal(updatedDeal);

              res.send({
                deal: formattedDeal,
              });
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              error: `Error updating Deal with id=${id}`,
            });
          });
      } else {
        res.status(404).send({
          error: `Deal with id=${id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: `Error retrieving User with id=${id}`,
      });
    });
};
