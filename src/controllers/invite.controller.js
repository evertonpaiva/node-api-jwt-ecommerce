const db = require('../models');
const Invite = db.invite;
const User = db.user;

// Format invite data
formatInvite = (invite) => {
  return {
    name: invite.name,
    email: invite.email,
    user: invite.user,
    user_invited: invite.user_invited,
  };
};

// Find a invite by id
exports.findOne = (req, res) => {
  const invite_id = req.params.invite_id;
  const user_id = req.params.user_id;

  Invite.findByPk(invite_id)
    .then((data) => {
      if (data) {
        // check if provided invite_id belogs to user_id
        if (data.user_invited != user_id) {
          res.status(404).send({
            error:
              'Invite with id=' +
              invite_id +
              ' does not belongs to Deal with id=' +
              user_id +
              '.',
          });
        } else {
          formattedInvite = formatInvite(data);

          res.send({
            invite: formattedInvite,
          });
        }
      } else {
        res.status(404).send({
          error: 'Invite with id=' + invite_id + ' not found.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: 'Error retrieving Invite with id=' + invite_id,
      });
    });
};

// Find invites from a user
exports.findByUser = (req, res) => {
  const user_invited = req.params.user_id;

  Invite.findAll({
    where: {
      user_invited: user_invited,
    },
  })
    .then((result) => {
      // array of records
      let invites = [];

      // formating data to respond
      result.forEach((b) => {
        let formattedInvite = formatInvite(b);
        invites.push({ invite: formattedInvite });
      });

      res.send(invites);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving Invites with Deal id=' + user_id,
      });
    });
};

// Create a new invite
exports.create = (req, res) => {
  const user_id = req.params.user_id;

  // Create invited user
  User.create({
    name: req.body.name,
    email: req.body.email,
  })
    .then((user) => {
      let invitedUser = user.get();
      // Create invite
      Invite.create({
        name: invitedUser.name,
        email: invitedUser.email,
        user: invitedUser.id,
        user_invited: req.userId,
      })
        .then((invite) => {
          formattedInvite = formatInvite(invite);
          res.send(formattedInvite);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: 'Failed to create invite' });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: 'Failed to create user invited' });
    });
};

// Update a invite by the id and a user id
exports.update = (req, res) => {
  const invite_id = req.params.invite_id;
  const user_invited = req.params.user_id;

  Invite.findByPk(invite_id)
    .then((data) => {
      if (data) {
        // check if provided invite_id belogs to user_id
        if (data.user_invited != user_invited) {
          res.status(404).send({
            error:
              'Invite with id=' +
              invite_id +
              ' does not belongs to User with id=' +
              user_invited +
              '.',
          });
        } else {
          // update the record
          Invite.update(req.body, {
            where: { id: invite_id },
          })
            .then((invite) => {
              // retrieve updated record from database
              Invite.findByPk(invite_id).then((updatedInvite) => {
                formattedInvite = formatInvite(updatedInvite);

                res.send({
                  user: formattedInvite,
                });
              });
            })
            .catch((err) => {
              res.status(500).send({
                error: 'Error updating Invite with id=' + invite_id,
              });
            });
        }
      } else {
        res.status(404).send({
          error: 'Invite with id=' + id + ' not found.',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: 'Error retrieving Invite with id=' + invite_id,
      });
    });
};
