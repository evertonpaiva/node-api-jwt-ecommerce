const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  define: {
    timestamps: false,
  },
  operatorsAliases: 0,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.deal = require('./deal.model.js')(sequelize, Sequelize);
db.bid = require('./bid.model.js')(sequelize, Sequelize);
db.message = require('./message.model.js')(sequelize, Sequelize);
db.delivery = require('./delivery.model.js')(sequelize, Sequelize);
db.invite = require('./invite.model.js')(sequelize, Sequelize);
db.token = require('./token.model.js')(sequelize, Sequelize);

module.exports = db;
