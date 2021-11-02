module.exports = (sequelize, Sequelize) => {
  const Bid = sequelize.define('bids', {
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
    accepted: {
      type: Sequelize.BOOLEAN,
    },
    value: {
      type: Sequelize.DOUBLE,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  Bid.associate = (models) => {
    Bid.belongsTo(models.Bid, { foreignKey: 'deal_id', as: 'deal' });
  };

  Bid.associate = (models) => {
    Bid.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Bid;
};
