const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// set port, listen for requests
const PORT = process.env.PORT || 9090;
const RESET_DATABASE = process.env.RESET_DATABASE || true;

// database
const db = require('./models');
const initial = require('./models/init-db').initial;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: RESET_DATABASE }).then(() => {
  console.log('Drop and Resync Database with { force: true }');

  // populate initial data to database
  if (RESET_DATABASE) {
    initial();
  }
});

var corsOptions = {
  origin: 'http://localhost:9090',
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
