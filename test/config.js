const { NODE_ENV } = process.env;

require('dotenv').config({
  path: NODE_ENV === 'test' ? '.env.test' : '.env',
});

const { NODE_HOST } = process.env;
const { NODE_PORT } = process.env;
const { API_USER } = process.env;
const { API_PASS } = process.env;
const { API_VERSION } = process.env;
const { API_APP_TOKEN } = process.env;

if (!NODE_HOST || !NODE_PORT) {
  throw new Error(
    `Please, fill the NODE_HOST and NODE_PORT values in .env.${NODE_ENV} file.`
  );
}

const API_ROOT = `/api/v${API_VERSION}`;
const API_URL = `http://${NODE_HOST}:${NODE_PORT}`;

if (!API_USER || !API_PASS) {
  throw new Error(
    `Please, fill the API_USER and API_PASS values in .env.${NODE_ENV} file.`
  );
}

module.exports = {
  API_URL,
  API_ROOT,
  API_USER,
  API_PASS,
  API_APP_TOKEN,
};
