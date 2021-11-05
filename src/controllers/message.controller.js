const db = require('../models');
const Message = db.message;

// Format message data
formatMessage = (message) => {
  return {
    user_id: message.user_id,
    title: message.title,
    message: message.message,
  };
};

// Find a message by id
exports.findOne = (req, res) => {
  const message_id = req.params.message_id;
  const deal_id = req.params.deal_id;

  Message.findByPk(message_id)
    .then((data) => {
      if (data) {
        // check if provided message_id belogs to deal_id
        if (data.deal_id != deal_id) {
          res.status(404).send({
            error:
              'Message with id=' +
              message_id +
              ' does not belongs to Deal with id=' +
              deal_id +
              '.',
          });
        } else {
          formattedMessage = formatMessage(data);

          res.send({
            message: formattedMessage,
          });
        }
      } else {
        res.status(404).send({
          error: 'Message with id=' + message_id + ' not found.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: 'Error retrieving Message with id=' + message_id,
      });
    });
};

// Find messages from a deal
exports.findByDeal = (req, res) => {
  const deal_id = req.params.deal_id;

  Message.findAll({
    where: {
      deal_id: deal_id,
    },
  })
    .then((result) => {
      // array of records
      let messages = [];

      // formating data to respond
      result.forEach((b) => {
        let formattedMessage = formatMessage(b);
        messages.push({ message: formattedMessage });
      });

      res.send(messages);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving Messages with Deal id=' + deal_id,
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

// Update a message by the id and a deal id
exports.update = (req, res) => {
  const message_id = req.params.message_id;
  const deal_id = req.params.deal_id;

  Message.findByPk(message_id)
    .then((data) => {
      if (data) {
        // check if provided message_id belogs to deal_id
        if (data.deal_id != deal_id) {
          res.status(404).send({
            error:
              'Message with id=' +
              message_id +
              ' does not belongs to Deal with id=' +
              deal_id +
              '.',
          });
        } else {
          // update the record
          Message.update(req.body, {
            where: { id: message_id },
          })
            .then((message) => {
              // retrieve updated record from database
              Message.findByPk(message_id).then((updatedMessage) => {
                formattedMessage = formatMessage(updatedMessage);

                res.send({
                  message: formattedMessage,
                });
              });
            })
            .catch((err) => {
              res.status(500).send({
                error: 'Error updating Message with id=' + message_id,
              });
            });
        }
      } else {
        res.status(404).send({
          error: 'Message with id=' + message_id + ' not found.',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving Message with id=' + message_id,
      });
    });
};
