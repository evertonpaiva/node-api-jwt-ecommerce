// const should = require("should");
const request = require('request');
const chai = require('chai');

const { expect } = chai;
const {
  API_URL,
  API_ROOT,
  API_USER,
  API_PASS,
  API_APP_TOKEN,
} = require('./config');

describe('Server test', () => {
  describe('Server is running', () => {
    it('Should return status code 200', (done) => {
      request.get(
        {
          url: `${API_URL}/`,
        },
        (error, response, body) => {
          // status code expected
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });
});

describe('Auth test', () => {
  describe('Try to access a protected route', () => {
    it('Guest try to acess a protected route', (done) => {
      request.post(
        {
          url: `${API_URL}${API_ROOT}/users/1`,
        },
        (err, response, body) => {
          // status code expected
          expect(response.statusCode).to.equal(404);

          done();
        }
      );
    });
  });
  describe('User and pass auth', () => {
    describe('/api/v{n}/authenticate POST', () => {
      it('Right user and pass', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/authenticate`,
            form: {
              login: API_USER,
              password: API_PASS,
            },
          },
          (err, response, body) => {
            const { token, user } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(user.login).to.equal(API_USER);
            expect(token).to.not.be.null;

            done();
          }
        );
      });

      it('Wrong user and pass', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/authenticate`,
            form: {
              login: API_USER,
              password: 'wrong-pass',
            },
          },
          (err, response, body) => {
            const { error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(401);

            // data expected
            expect(error).to.not.be.null;

            done();
          }
        );
      });
    });
  });

  describe('SSO auth', () => {
    describe('/api/v{n}/authenticate/sso POST', () => {
      it('Right user and app_token', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/authenticate/sso`,
            form: {
              login: API_USER,
              app_token: API_APP_TOKEN,
            },
          },
          (err, response, body) => {
            const { token, user } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(user.login).to.equal(API_USER);
            expect(token).to.not.be.null;

            done();
          }
        );
      });

      it('Wrong user and pass', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/authenticate/sso`,
            form: {
              login: API_USER,
              app_token: 'wrong-pass',
            },
          },
          (err, response, body) => {
            const { error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(404);

            // data expected
            expect(error).to.not.be.null;

            done();
          }
        );
      });
    });
  });
});
