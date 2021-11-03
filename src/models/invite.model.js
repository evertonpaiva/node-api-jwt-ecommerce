module.exports = (sequelize, Sequelize) => {
  const Invite = sequelize.define('invites', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // user invited
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // User hasOne Invite
        model: 'users',
        key: 'id',
      },
    },
    // user who creates the invite
    user_invited: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // User hasMany Invites
        model: 'users',
        key: 'id',
      },
    },
  });

  Invite.associate = (models) => {
    Invite.belongsTo(models.User, { foreignKey: 'user', as: 'user' });
  };

  Invite.associate = (models) => {
    Invite.belongsTo(models.User, { foreignKey: 'user_invited', as: 'user' });
  };

  return Invite;
};
