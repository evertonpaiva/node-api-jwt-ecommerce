const { NODE_ENV } = process.env;

require('dotenv').config({
  path: NODE_ENV === 'test' ? '.env.test' : '.env',
});

const Sequelize = require('sequelize');
const config = require('../config/db.config');

const DATABASE_SHOWLOGS = process.env.DATABASE_SHOWLOGS === 'true';

// Sequelize logging
// default value: console.log
// disable loggin: false
const showLogs = DATABASE_SHOWLOGS ? console.log : false;

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  define: {
    timestamps: false,
  },
  operatorsAliases: 0,
  logging: showLogs,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.deal = require('./deal.model')(sequelize, Sequelize);
db.bid = require('./bid.model')(sequelize, Sequelize);
db.message = require('./message.model')(sequelize, Sequelize);
db.delivery = require('./delivery.model')(sequelize, Sequelize);
db.invite = require('./invite.model')(sequelize, Sequelize);
db.token = require('./token.model')(sequelize, Sequelize);

module.exports = db;
