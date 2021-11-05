const { NODE_ENV } = process.env;

require('dotenv').config({
  path: NODE_ENV === 'test' ? '.env.test' : '.env',
});

const { NODE_HOST } = process.env;
const { NODE_PORT } = process.env;
const forceDrop = process.env.DATABASE_FORCE_DROP === 'true';
const populateData = process.env.DATABASE_POPULATE_DATA === 'true';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// database
const { databaseInit } = require('./models/init.db');

const corsOptions = {
  origin: `http://${NODE_HOST}:${NODE_PORT}`,
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Express API is Ready' });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/deal.routes')(app);
require('./routes/bid.routes')(app);
require('./routes/message.routes')(app);
require('./routes/delivery.routes')(app);
require('./routes/invite.routes')(app);

module.exports = (async function () {
  console.log('Recreate and populate database');
  await databaseInit(forceDrop, populateData);

  const server = app.listen(NODE_PORT, () => {
    console.log(`Server is running on port ${NODE_PORT}.`);
  });

  return server;
})();
