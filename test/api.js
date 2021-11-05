const { NODE_ENV } = process.env;

require('dotenv').config({
  path: NODE_ENV === 'test' ? '.env.test' : '.env',
});

const request = require('request-promise');
const { API_URL, API_ROOT, API_USER, API_PASS } = require('./config');

before(async () => {
  // load the web server
  // await for the server starts
  const server = await require('../src/server');

  // try authenticate
  const body = await request.post({
    url: `${API_URL}${API_ROOT}/authenticate`,
    form: {
      login: API_USER,
      password: API_PASS,
    },
  });

  // extract token from response
  const { token } = JSON.parse(body);

  // share auth_token whith all tests
  global.auth_token = token;
});
