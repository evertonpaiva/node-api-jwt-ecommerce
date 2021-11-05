const { calcularPrecoPrazo } = require('correios-brasil');
const db = require('../models');

const Delivery = db.delivery;
const Deal = db.deal;
const User = db.user;

// Format message data
const formatDelivery = (delivery) => {
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

const shippingCost = async (dealId, userId) => {
  // get zip code from seller
  const fromCode = await Deal.findByPk(dealId)
    .then((deal) => {
      if (!deal) {
        throw new Error(`Error retrieving information from Deal id=${dealId}`);
      }

      return deal.get().zip_code.toString();
    })
    .catch((err) => {
      throw new Error(`Error retrieving information Deal id=${dealId}`);
    });

  // get zip code from buyer
  const toCode = await User.findByPk(userId)
    .then((user) => {
      if (!user) {
        throw new Error(`Error retrieving information from User id=${userId}`);
      }
      return user.get().zip_code.toString();
    })
    .catch((err) => {
      throw new Error(err);
    });

  const args = {
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
      const notes = response[0].obsFim ? response[0].obsFim : '';

      const delivery = {
        cost: response[0].Valor.replace(',', '.'),
        days: response[0].PrazoEntrega,
        notes,
        deal_id: dealId,
        user_id: userId,
        cep_from: fromCode,
        cep_to: toCode,
      };

      return delivery;
    })
    .catch((err) => {
      throw new Error(`Error getting shipping cost:${err}`);
    });
};

// Find shipping cost from a deal
const findShippingCost = async (req, res) => {
  const dealId = req.params.deal_id;
  const { userId } = req;

  shippingCost(dealId, userId)
    .then((delivery) => {
      res.send({
        delivery,
        steps: [],
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: `Error calculating shipping cost. ${err}`,
      });
    });
};

// Create a new message
const create = async (req, res) => {
  const dealId = req.params.deal_id;
  const userId = req.body.user_id;

  if (!userId) {
    res.status(500).send({ error: 'User id is not provided.' });
  }

  const delivery = await shippingCost(dealId, userId).catch((err) => {
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
    .then((newDelivery) => {
      const formattedDelivery = formatDelivery(newDelivery);
      res.send({
        delivery: formattedDelivery,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

module.exports = {
  findShippingCost,
  create,
};
