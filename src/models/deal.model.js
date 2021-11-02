module.exports = (sequelize, Sequelize) => {
  const Deal = sequelize.define('deals', {
    type: {
      type: Sequelize.ENUM,
      values: ['1 - Venda', '2 - Troca', '3 - Desejo'],
    },
    value: {
      type: Sequelize.DOUBLE,
    },
    description: {
      type: Sequelize.STRING,
    },
    trade_for: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.DOUBLE,
    },
    lng: {
      type: Sequelize.DOUBLE,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zip_code: {
      type: Sequelize.INTEGER,
    },
    urgency_type: {
      type: Sequelize.ENUM,
      values: ['1 - Baixa', '2 - Média', '3 - Alta', '4 - Data'],
    },
    urgency_limit_date: {
      type: Sequelize.DATE,
    },
    photos: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // User hasMany Deals
        model: 'users',
        key: 'id',
      },
    },
  });

  Deal.associate = (models) => {
    Deal.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Deal;
};
