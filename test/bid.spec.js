const request = require('request');
const chai = require('chai');

const { expect } = chai;
const { API_URL, API_ROOT } = require('./config');

describe('Bid test', () => {
  // List
  describe('List bid by deal and id', () => {
    describe('/api/v{n}/deals/{ID}/bids/{ID} GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/1/bids/1`,
          },
          (err, response, body) => {
            const { bid } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(bid).to.be.an('object');
            expect(bid.description).to.equal('Pagamento a vista');

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/1/bids/99`,
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

  // List all bids by deal
  describe('List all bids by deal', () => {
    describe('/api/v{n}/deals/{ID}/bids GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/1/bids`,
          },
          (err, response, body) => {
            const bids = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(bids).to.be.an('array');
            expect(bids[0]).to.be.an('object');
            expect(bids[0].description).to.not.be.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/99/bids`,
          },
          (err, response, body) => {
            const bids = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(bids).that.eql([]);

            done();
          }
        );
      });
    });
  });

  // Create
  describe('Create bid', () => {
    describe('/api/v{n}/deals/{ID}/bids POST', () => {
      it('Success request', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/deals/1/bids`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              accepted: 0,
              value: 99.5,
              description: 'Pagamento via Pix',
              user_id: 2,
            },
          },
          (err, response, body) => {
            const { bid, error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(bid).to.be.an('object');
            expect(bid.id).to.not.be.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/deals/1/bids`,
            headers: {
              Authorization: `Bearer ${authToken}`,
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

  // Update
  describe('Update bid', () => {
    describe('/api/v{n}/deals/1/bids/{ID} PUT', () => {
      it('Success request', (done) => {
        const newDescription = 'Pagamento via cheque';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/deals/1/bids/1`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              description: newDescription,
            },
          },
          (err, response, body) => {
            const { bid, error } = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(bid).to.be.an('object');
            expect(bid.description).to.equal(newDescription);

            done();
          }
        );
      });
      it('Fail request', (done) => {
        const newDescription = 'Pagamento via cheque';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/deals/1/bids/99`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              description: newDescription,
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
