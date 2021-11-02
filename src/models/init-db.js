const db = require('../models');
const User = db.user;
const Deal = db.deal;

// Database inicialization
exports.initial = async () => {
  console.log('Setting initial data to database');

  let newUser = await User.create({
    name: 'Everton Paiva',
    email: 'evertonpaiva@gmail.com',
    login: 'evertonpaiva',
    password: '$2a$08$M6GNBrZ2HnYLnRWBVKnKg.HQX6qNU56fin72vbIgOX6olYj38Vuhu', //abc123-
    lat: 38.8951,
    lng: -77.0364,
    address: 'Rua Direita',
    city: 'Diamantina',
    state: 'MG',
    zip_code: 39100000,
  })
    .then((newUser) => {
      console.log('User ' + newUser.get().id + ' created.');
      return newUser.get();
    })
    .catch((err) => {
      console.log('Error while user creation : ', err);
    });

  Deal.create({
    type: '1 - Venda',
    value: 10.5,
    description: 'Teclado Gamer Coolermaster XYZ',
    trade_for: 'Webcam 4k',
    lat: 38.8951,
    lng: -77.0364,
    address: 'Rua Direita',
    city: 'Diamantina',
    state: 'MG',
    zip_code: 39100000,
    urgency_type: '1 - Baixa',
    photos: ['coolemaster-1.jpg', 'coolemaster-2.jpg'],
    userId: newUser.id,
  })
    .then((newDeal) => {
      console.log('Deal ' + newDeal.get().id + ' created.');
    })
    .catch((err) => {
      console.log('Error while deal creation : ', err);
    });
};
