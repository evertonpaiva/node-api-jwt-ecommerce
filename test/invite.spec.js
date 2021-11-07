const request = require('request');
const chai = require('chai');

const { expect } = chai;
const { API_URL, API_ROOT } = require('./config');

describe('Invite test', () => {
  //List
  describe('List invite by user and id', () => {
    describe('/api/v{n}/users/{ID}/invites/{ID} GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites/1`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
          (err, response, body) => {
            const { invite } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(invite).to.be.an('object');
            expect(invite.name).to.equal('Monteiro Lobato');

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites/99`,
            headers: {
              Authorization: `Bearer ${authToken}`,
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

  // List all invites by user
  describe('List all invites by user', () => {
    describe('/api/v{n}/users/{ID}/invites GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
          (err, response, body) => {
            const invite = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(invite).to.be.an('array');
            expect(invite[0]).to.be.an('object');
            expect(invite[0].name).to.be.not.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/users/99/invites`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
          (err, response, body) => {
            const invites = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(invites).that.eql([]);

            done();
          }
        );
      });
    });
  });

  // Create
  describe('Create invite', () => {
    describe('/api/v{n}/users/{ID}/invites POST', () => {
      it('Success request', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              name: 'Carmen Miranda',
              email: 'carmenmiranda@email.com',
            },
          },
          (err, response, body) => {
            const invite = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(invite).to.be.an('object');
            expect(invite.name).to.be.not.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites`,
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
  describe('Update invite', () => {
    describe('/api/v{n}/users/1/invites/{ID} PUT', () => {
      it('Success request', (done) => {
        const newName = 'Rubens Barrichello';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites/1`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              name: newName,
            },
          },
          (err, response, body) => {
            const { invite, error } = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(invite).to.be.an('object');
            expect(invite.name).to.equal(newName);

            done();
          }
        );
      });
      it('Fail request', (done) => {
        const newDescription = 'Pagamento via cheque';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites/99`,
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
