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
          res.status(500).send({ error: 'Failed to create invite' });
        });
    })
    .catch((err) => {
      res.status(500).send({ error: 'Failed to create user invited' });
    });
};
