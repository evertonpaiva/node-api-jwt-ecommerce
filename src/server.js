const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: 'http://localhost:9090',
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require('./models');
const Role = db.role;
const User = db.user;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Express API is Ready' });
});

// routes
require('./routes/auth.routes')(app);
//require('./app/routes/user.routes')(app);
//require('./app/routes/property.routes')(app);
// set port, listen for requests

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  User.create({
    name: 'Everton Paiva',
    email: 'evertonpaiva@gmail.com',
    login: 'evertonpaiva',
    password: '$2a$08$M6GNBrZ2HnYLnRWBVKnKg.HQX6qNU56fin72vbIgOX6olYj38Vuhu', //abc123-
  });
}
