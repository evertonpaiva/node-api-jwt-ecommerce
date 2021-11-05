const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const { API_URL, API_ROOT, API_USER } = require('./config');

describe('Deal test', () => {
  // List
  describe('List deal by id', () => {
    describe('/api/v{n}/deals/{ID} GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/1`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
          },
          (err, response, body) => {
            const { deal } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(deal).to.be.an('object');
            expect(deal.description).to.equal('Teclado Gamer Coolermaster XYZ');

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/99`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
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
  describe('Create deal', () => {
    describe('/api/v{n}/deals POST', () => {
      it('Success request', (done) => {
        let url = `${API_URL}${API_ROOT}/deals`;
        request.post(
          {
            url: `${API_URL}${API_ROOT}/deals`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
            form: {
              type: '2 - Troca',
              value: 1200.5,
              description: 'Cadeira gamer HKX',
              lat: 67.7524,
              lng: -36.5637,
              address: 'Rua do Ipiranda',
              city: 'Brasília',
              state: 'DF',
              zip_code: '38706400',
              urgency_type: '3 - Alta',
              photos: ['cadeira-1.png', 'cadeira-2.png'],
            },
          },
          (err, response, body) => {
            const { deal, error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(deal).to.be.an('object');
            expect(deal.id).to.not.be.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        let url = `${API_URL}${API_ROOT}/deals`;
        request.post(
          {
            url: `${API_URL}${API_ROOT}/deals`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
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
    });
  });

  // Update
  describe('Update deal', () => {
    describe('/api/v{n}/deals/{ID} PUT', () => {
      it('Success request', (done) => {
        let newDescription = 'Mouse USB de alta resolução';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/deals/1`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
            form: {
              description: newDescription,
            },
          },
          (err, response, body) => {
            const { deal } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(deal).to.be.an('object');
            expect(deal.description).to.equal(newDescription);

            done();
          }
        );
      });
      it('Fail request', (done) => {
        let newDescription = 'Mouse USB de alta resolução';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/deals/99`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
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
