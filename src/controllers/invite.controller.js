const db = require('../models');

const Invite = db.invite;
const User = db.user;

// Format invite data
const formatInvite = (invite) => {
  return {
    name: invite.name,
    email: invite.email,
    user: invite.user,
    user_invited: invite.user_invited,
  };
};

// Find invites from a user
exports.findByUser = (req, res) => {
  const userInvited = req.params.user_id;

  Invite.findAll({
    where: {
      user_invited: userInvited,
    },
  })
    .then((result) => {
      // array of records
      const invites = [];

      // formating data to respond
      result.forEach((b) => {
        const formattedInvite = formatInvite(b);
        invites.push({ invite: formattedInvite });
      });

      res.send(invites);
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Invites with Deal id=${userInvited}`,
      });
    });
};

// Create a new invite
exports.create = (req, res) => {
  // Create invited user
  User.create({
    name: req.body.name,
    email: req.body.email,
  })
    .then((user) => {
      const invitedUser = user.get();
      // Create invite
      Invite.create({
        name: invitedUser.name,
        email: invitedUser.email,
        user: invitedUser.id,
        user_invited: req.userId,
      })
        .then((invite) => {
          const formattedInvite = formatInvite(invite);
          res.send(formattedInvite);
        })
        .catch(() => {
          res.status(500).send({ error: 'Failed to create invite' });
        });
    })
    .catch(() => {
      res.status(500).send({ error: 'Failed to create user invited' });
    });
};
