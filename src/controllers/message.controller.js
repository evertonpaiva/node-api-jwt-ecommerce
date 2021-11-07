const db = require('../models');

const Message = db.message;

// Format message data
const formatMessage = (message) => {
  return {
    user_id: message.user_id,
    title: message.title,
    message: message.message,
  };
};

// Find a message by id
exports.findOne = (req, res) => {
  const messageId = Number(req.params.message_id);
  const dealId = Number(req.params.deal_id);

  Message.findByPk(messageId)
    .then((data) => {
      if (data) {
        // check if provided message_id belogs to deal_id
        if (data.deal_id !== dealId) {
          res.status(404).send({
            error: `Message with id=${messageId} does not belongs to Deal with id=${dealId}.`,
          });
        } else {
          const formattedMessage = formatMessage(data);

          res.send({
            message: formattedMessage,
          });
        }
      } else {
        res.status(404).send({
          error: `Message with id=${messageId} not found.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Message with id=${messageId}`,
      });
    });
};

// Find messages from a deal
exports.findByDeal = (req, res) => {
  const dealId = Number(req.params.deal_id);

  Message.findAll({
    where: {
      deal_id: dealId,
    },
  })
    .then((result) => {
      // array of records
      const messages = [];

      // formating data to respond
      result.forEach((b) => {
        const formattedMessage = formatMessage(b);
        messages.push({ message: formattedMessage });
      });

      res.send(messages);
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Messages with Deal id=${dealId}`,
      });
    });
};

// Create a new message
exports.create = (req, res) => {
  const dealId = Number(req.params.deal_id);

  // Save Message to Database
  Message.create({
    user_id: req.body.user_id,
    title: req.body.title,
    message: req.body.message,
    deal_id: dealId,
  })
    .then((message) => {
      const formattedMessage = formatMessage(message);

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
  const messageId = Number(req.params.message_id);
  const dealId = Number(req.params.deal_id);

  let formData = req.body;

  // remove empty properties from req
  Object.keys(formData).forEach(
    (k) => !formData[k] && formData[k] !== undefined && delete formData[k]
  );

  Message.findByPk(messageId)
    .then((data) => {
      if (data) {
        // check if provided message_id belogs to deal_id
        if (data.deal_id !== dealId) {
          res.status(404).send({
            error: `Message with id=${messageId} does not belongs to Deal with id=${dealId}.`,
          });
        } else {
          // update the record
          Message.update(formData, {
            where: { id: messageId },
          })
            .then(() => {
              // retrieve updated record from database
              Message.findByPk(messageId).then((updatedMessage) => {
                const formattedMessage = formatMessage(updatedMessage);

                res.send({
                  message: formattedMessage,
                });
              });
            })
            .catch(() => {
              res.status(500).send({
                error: `Error updating Message with id=${messageId}`,
              });
            });
        }
      } else {
        res.status(404).send({
          error: `Message with id=${messageId} not found.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Message with id=${messageId}`,
      });
    });
};
