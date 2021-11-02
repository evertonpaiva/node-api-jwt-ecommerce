module.exports = (sequelize, Sequelize) => {
  const Delivery = sequelize.define('messages', {
    deal_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // Deal hasOne Delivery
        model: 'deals',
        key: 'id',
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // User hasMany Deliveries
        model: 'users',
        key: 'id',
      },
    },
    cep_from: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cep_to: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cost: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    days: {
      type: Sequelize.INT,
      allowNull: false,
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Delivery.associate = (models) => {
    Delivery.belongsTo(models.Deal, { foreignKey: 'deal_id', as: 'deal' });
  };

  Delivery.associate = (models) => {
    Delivery.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Delivery;
};
