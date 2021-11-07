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

// Find a invite by id
exports.findOne = (req, res) => {
  const inviteId = Number(req.params.invite_id);
  const userId = Number(req.params.user_id);

  Invite.findByPk(inviteId)
    .then((data) => {
      if (data) {
        const formattedInvite = formatInvite(data);

        res.send({
          invite: formattedInvite,
        });
      } else {
        res.status(404).send({
          error: `Invite with id=${inviteId} not found.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Invite with id=${inviteId}`,
      });
    });
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

// Update a invite by the id and a user id
exports.update = (req, res) => {
  const inviteId = Number(req.params.invite_id);
  const userId = Number(req.params.user_id);

  let formData = req.body;

  // remove empty properties from req
  Object.keys(formData).forEach(
    (k) => !formData[k] && formData[k] !== undefined && delete formData[k]
  );

  Invite.findByPk(inviteId)
    .then((data) => {
      if (data) {
        // update the record
        Invite.update(formData, {
          where: { id: inviteId },
        })
          .then(() => {
            // retrieve updated record from database
            Invite.findByPk(inviteId).then((updatedInvite) => {
              const formattedInvite = formatInvite(updatedInvite);

              res.send({
                invite: formattedInvite,
              });
            });
          })
          .catch(() => {
            res.status(500).send({
              error: `Error updating Invite with id=${inviteId}`,
            });
          });
      } else {
        res.status(404).send({
          error: `Invite with id=${inviteId} not found.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        error: `Error retrieving Invite with id=${inviteId}`,
      });
    });
};
