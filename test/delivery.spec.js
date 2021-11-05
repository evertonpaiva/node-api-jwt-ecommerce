const request = require('request');
const chai = require('chai');

const { expect } = chai;
const { API_URL, API_ROOT, API_USER } = require('./config');

describe('Delivery test', () => {
  // List all deliveries by deal
  describe('List all deliveries by deal', () => {
    describe('/api/v{n}/deals/{ID}/deliveries GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/1/deliveries`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
          },
          (err, response, body) => {
            const delivery = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(delivery).to.be.an('object');
            expect(delivery.cost).to.be.not.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/99/deliveries`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
          },
          (err, response, body) => {
            const { error } = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(500);

            // data expected
            expect(error).to.be.not.null;

            done();
          }
        );
      });
    });
  });

  // Create
  describe('Create delivery', () => {
    describe('/api/v{n}/deals/{ID}/deliveries POST', () => {
      it('Success request', (done) => {
        const url = `${API_URL}${API_ROOT}/deals/1/deliveries`;
        request.post(
          {
            url: `${API_URL}${API_ROOT}/deals/1/deliveries`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
            form: {
              user_id: 2,
            },
          },
          (err, response, body) => {
            const { delivery, error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(error).to.not.be.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        const url = `${API_URL}${API_ROOT}/deliveries`;
        request.post(
          {
            url: `${API_URL}${API_ROOT}/deals/1/deliveries`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
            form: {
              accepted: 0,
            },
          },
          (err, response, body) => {
            const { error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(500);

            // data expected
            expect(error).to.not.be.null;

            done();
          }
        );
      });
    });
  });
});
