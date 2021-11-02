const db = require('../models');
const Delivery = db.delivery;
const Deal = db.deal;
const User = db.user;
const { calcularPrecoPrazo } = require('correios-brasil');
const { user } = require('../models');

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

// Find shipping cost from a deal
exports.findShippingCost = async (req, res) => {
  const deal_id = req.params.deal_id;
  const user_id = req.userId;

  // get cep from seller
  let cep_from = await Deal.findByPk(deal_id)
    .then((deal) => {
      return deal.get().zip_code;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving information Deal id=' + deal_id,
      });
    });

  // get cep from buyer
  let cep_to = await User.findByPk(user_id)
    .then((user) => {
      return user.get().zip_code;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving information User id=' + user_id,
      });
    });

  let args = {
    sCepOrigem: cep_from.toString(),
    sCepDestino: cep_to.toString(),
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
  calcularPrecoPrazo(args)
    .then((response) => {
      let delivery = {
        cost: response[0]['Valor'],
        days: response[0]['PrazoEntrega'],
        notes: response[0]['obsFim'],
        deal_id: deal_id,
        user_id: user_id,
      };

      res.send({
        delivery: delivery,
        steps: [],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving Shipping Cost with Deal id=' + deal_id,
      });
    });
};

// Create a new message
exports.create = (req, res) => {
  const deal_id = req.params.deal_id;

  // Save Message to Database
  Message.create({
    user_id: req.body.user_id,
    title: req.body.title,
    message: req.body.message,
    deal_id: deal_id,
  })
    .then((message) => {
      formattedMessage = formatMessage(message);

      res.send({
        message: formattedMessage,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};
