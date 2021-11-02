module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define('messages', {
    deal_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // Deal hasMany Bids
        model: 'deals',
        key: 'id',
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // User hasMany Bids
        model: 'users',
        key: 'id',
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Deal, { foreignKey: 'deal_id', as: 'deal' });
  };

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Message;
};
