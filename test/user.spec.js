const request = require('request');
const chai = require('chai');

const { expect } = chai;
const { API_URL, API_ROOT, API_USER } = require('./config');

describe('User test', () => {
  // List
  describe('List user by id', () => {
    describe('/api/v{n}/users/{ID} GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/users/1`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
          (err, response, body) => {
            const { user } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(user).to.be.an('object');
            expect(user.login).to.equal(API_USER);

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/users/99`,
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

  // Create
  describe('Create user', () => {
    describe('/api/v{n}/users POST', () => {
      it('Success request', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/users`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              name: 'Carlos Alberto',
              email: 'carlosalberto@email.com',
              login: 'carlosalberto',
              password: 'zxcvb123-',
              lat: 67.7524,
              lng: -36.5637,
              address: 'Rua dos Inconfidentes',
              city: 'São Paulo',
              state: 'SP',
              zip_code: '01034903',
            },
          },
          (err, response, body) => {
            const { user } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(user).to.be.an('object');
            expect(user.id).to.not.be.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/users`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              email: 'tiradentes@email.com',
              login: 'tiradentes',
              password: 'zxcvb123-',
              lat: 67.7524,
              lng: -36.5637,
              address: 'Rua dos Inconfidentes',
              city: 'São Paulo',
              state: 'SP',
              zip_code: '01034903',
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
      it('Fail request - duplicated email', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/users`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              name: 'Carlos Alberto',
              email: 'carlosalberto@email.com',
              login: 'carlos',
              password: 'zxcvb123-',
              lat: 67.7524,
              lng: -36.5637,
              address: 'Rua dos Inconfidentes',
              city: 'São Paulo',
              state: 'SP',
              zip_code: '01034903',
            },
          },
          (err, response, body) => {
            const { error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(400);

            // data expected
            expect(error).to.not.be.null;

            done();
          }
        );
      });
      it('Fail request - duplicated user', (done) => {
        request.post(
          {
            url: `${API_URL}${API_ROOT}/users`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              name: 'Carlos Alberto',
              email: 'carlosa@email.com',
              login: 'carlosalberto',
              password: 'zxcvb123-',
              lat: 67.7524,
              lng: -36.5637,
              address: 'Rua dos Inconfidentes',
              city: 'São Paulo',
              state: 'SP',
              zip_code: '01034903',
            },
          },
          (err, response, body) => {
            const { error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(400);

            // data expected
            expect(error).to.not.be.null;

            done();
          }
        );
      });
    });
  });

  // Update
  describe('Update user', () => {
    describe('/api/v{n}/users/{ID} PUT', () => {
      it('Success request', (done) => {
        const newName = 'Oscar Niemeyer';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/users/1`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              name: newName,
            },
          },
          (err, response, body) => {
            const { user } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(user).to.be.an('object');
            expect(user.name).to.equal(newName);

            done();
          }
        );
      });
      it('Fail request', (done) => {
        const newName = 'Oscar Niemeyer';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/users/99`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            form: {
              name: newName,
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
