module.exports = {
  HOST: 'ecommerce-db',
  USER: 'ecommerce-user',
  PASSWORD: 'RAnoP5244X9Aen5w8U6CKQ',
  DB: 'ecommerce',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
