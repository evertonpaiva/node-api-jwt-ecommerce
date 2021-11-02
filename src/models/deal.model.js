module.exports = (sequelize, Sequelize) => {
  const Deal = sequelize.define('deals', {
    type: {
      type: Sequelize.ENUM,
      values: ['1 - Venda', '2 - Troca', '3 - Desejo'],
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
    trade_for: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    lng: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zip_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    urgency_type: {
      type: Sequelize.ENUM,
      values: ['1 - Baixa', '2 - Média', '3 - Alta', '4 - Data'],
      allowNull: false,
    },
    urgency_limit_date: {
      type: Sequelize.DATE,
    },
    photos: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    user_id: {
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
    Deal.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Deal;
};
