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
      allowNull: false,
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
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
