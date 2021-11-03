module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define('token', {
    // user owner of the token
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // User hasMany Tokens
        model: 'users',
        key: 'id',
      },
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  Token.associate = (models) => {
    Token.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Token;
};
