const db = require('../models');
const Delivery = db.delivery;
const Deal = db.deal;
const User = db.user;
const { calcularPrecoPrazo } = require('correios-brasil');
const { delivery } = require('../models');

// Format message data
formatDelivery = (delivery) => {
  return {
    user_id: delivery.user_id,
    deal_id: delivery.user_id,
    cep_from: delivery.cep_from,
    cep_to: delivery.cep_to,
    cost: delivery.cost,
    days: delivery.days,
    notes: delivery.notes,
  };
};

shippingCost = async (deal_id, user_id) => {
  // get zip code from seller
  let fromCode = await Deal.findByPk(deal_id)
    .then((deal) => {
      if (!deal) {
        throw new Error('Error retrieving information from Deal id=' + deal_id);
      }

      return deal.get().zip_code.toString();
    })
    .catch((err) => {
      throw new Error('Error retrieving information Deal id=' + deal_id);
    });

  // get zip code from buyer
  let toCode = await User.findByPk(user_id)
    .then((user) => {
      if (!user) {
        throw new Error('Error retrieving information from User id=' + user_id);
      }
      return user.get().zip_code.toString();
    })
    .catch((err) => {
      throw new Error(err);
    });

  let args = {
    sCepOrigem: fromCode,
    sCepDestino: toCode,
    // default values - @to-do: update values from each product
    nVlPeso: '1',
    nCdFormato: '1',
    nVlComprimento: '20',
    nVlAltura: '20',
    nVlLargura: '20',
    nCdServico: ['04014'], // service code from brazilian Correios - SEDEX à vista
    nVlDiametro: '0',
  };

  // getting shipping cost from Correios
  return calcularPrecoPrazo(args)
    .then((response) => {
      let notes = response[0]['obsFim'] ? response[0]['obsFim'] : '';

      let delivery = {
        cost: response[0]['Valor'].replace(',', '.'),
        days: response[0]['PrazoEntrega'],
        notes: notes,
        deal_id: deal_id,
        user_id: user_id,
        cep_from: fromCode,
        cep_to: toCode,
      };

      return delivery;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Find shipping cost from a deal
exports.findShippingCost = async (req, res) => {
  const deal_id = req.params.deal_id;
  const user_id = req.userId;

  shippingCost(deal_id, user_id)
    .then((delivery) => {
      res.send({
        delivery: delivery,
        steps: [],
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 'Error calculating shipping cost. ' + err,
      });
    });
};

// Create a new message
exports.create = async (req, res) => {
  const deal_id = req.params.deal_id;
  const user_id = req.body.user_id;

  if (!user_id) {
    res.status(500).send({ error: 'User id is not provided.' });
  }

  let delivery = await shippingCost(deal_id, user_id).catch((err) => {
    res.status(500).send({ error: err.message });
  });

  // Save Delivery to Database
  Delivery.create({
    deal_id: delivery.deal_id,
    user_id: delivery.user_id,
    cep_from: delivery.cep_from,
    cep_to: delivery.cep_to,
    cost: delivery.cost,
    days: delivery.days,
    notes: delivery.notes,
  })
    .then((delivery) => {
      let formattedDelivery = formatDelivery(delivery);
      res.send({
        delivery: formattedDelivery,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};
