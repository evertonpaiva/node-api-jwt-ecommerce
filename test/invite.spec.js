const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const { API_URL, API_ROOT, API_USER } = require('./config');

describe('Invite test', () => {
  // List all invites by user
  describe('List all invites by user', () => {
    describe('/api/v{n}/users/{ID}/invites GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
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
              Authorization: `Bearer ${auth_token}`,
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
        let url = `${API_URL}${API_ROOT}/users/1/invites`;
        request.post(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
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
        let url = `${API_URL}${API_ROOT}/invites`;
        request.post(
          {
            url: `${API_URL}${API_ROOT}/users/1/invites`,
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
