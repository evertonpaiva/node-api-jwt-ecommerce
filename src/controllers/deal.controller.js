const db = require('../models');

const Deal = db.deal;

// Format deal data
const formatDeal = (deal) => {
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
const findOne = (req, res) => {
  const { id } = req.params;

  Deal.findByPk(id)
    .then((data) => {
      if (data) {
        const formattedDeal = formatDeal(data);

        res.send({
          deal: formattedDeal,
        });
      } else {
        res.status(404).send({
          error: `Deal with id=${id} not found.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Deal with id=${id}`,
      });
    });
};

// Create a new deal
const create = (req, res) => {
  // if photos not is array, convert to array
  const photos = !Array.isArray(req.body.photos)
    ? Array(req.body.photos)
    : req.body.photos;

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
    photos: photos,
    user_id: req.userId,
  })
    .then((deal) => {
      const formattedDeal = formatDeal(deal);

      res.send({
        deal: formattedDeal,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

// Update a deal by the id in the request
const update = (req, res) => {
  const { id } = req.params;

  let formData = req.body;

  // remove empty properties from req
  Object.keys(formData).forEach(
    (k) => !formData[k] && formData[k] !== undefined && delete formData[k]
  );

  Deal.findByPk(id)
    .then((data) => {
      if (data) {
        // update the record
        Deal.update(formData, {
          where: { id },
        })
          .then(() => {
            // retrieve updated record from database
            Deal.findByPk(id).then((updatedDeal) => {
              const formattedDeal = formatDeal(updatedDeal);

              res.send({
                deal: formattedDeal,
              });
            });
          })
          .catch(() => {
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
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving User with id=${id}`,
      });
    });
};

module.exports = {
  findOne,
  create,
  update,
};
