const db = require('../models');
const User = db.user;
const Deal = db.deal;
const Bid = db.bid;

// Database inicialization
exports.initial = async () => {
  console.log('Setting initial data to database');

  let firstUser = await User.create({
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

  let secondUser = await User.create({
    name: 'Joao da Silva',
    email: 'joaodasilva@email.com',
    login: 'joaosilva',
    password: '$2a$08$M6GNBrZ2HnYLnRWBVKnKg.HQX6qNU56fin72vbIgOX6olYj38Vuhu', //abc123-
    lat: -25.7524,
    lng: 77.5487,
    address: 'Rua Presidente',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zip_code: 22300999,
  })
    .then((newUser) => {
      console.log('User ' + newUser.get().id + ' created.');
      return newUser.get();
    })
    .catch((err) => {
      console.log('Error while user creation : ', err);
    });

  let firstDeal = await Deal.create({
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
    user_id: firstUser.id,
  })
    .then((newDeal) => {
      console.log('Deal ' + newDeal.get().id + ' created.');
      return newDeal.get();
    })
    .catch((err) => {
      console.log('Error while deal creation : ', err);
    });

  let firstBid = await Bid.create({
    deal_id: firstDeal.id,
    user_id: secondUser.id,
    accepted: false,
    value: 9.9,
    description: 'Pagamento a vista',
  })
    .then((newDeal) => {
      console.log('Bid ' + newDeal.get().id + ' created.');
    })
    .catch((err) => {
      console.log('Error while bid creation : ', err);
    });
};
