const request = require('request');
const chai = require('chai');

const { expect } = chai;
const { API_URL, API_ROOT, API_USER } = require('./config');

describe('Message test', () => {
  // List
  describe('List message by deal and id', () => {
    describe('/api/v{n}/deals/{ID}/messages/{ID} GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/1/messages/1`,
          },
          (err, response, body) => {
            const { message } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(message).to.be.an('object');
            expect(message.message).to.equal(
              'Tenho interesse no seu produto. Você poderia me enviar mais fotos?'
            );

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/1/messages/99`,
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

  // List all messages by deal
  describe('List all messages by deal', () => {
    describe('/api/v{n}/deals/{ID}/messages GET', () => {
      it('Success request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/1/messages`,
          },
          (err, response, body) => {
            const messages = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(messages).to.be.an('array');
            expect(messages[0]).to.be.an('object');
            expect(messages[0].description).to.not.be.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        request.get(
          {
            url: `${API_URL}${API_ROOT}/deals/99/messages`,
          },
          (err, response, body) => {
            const messages = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(messages).that.eql([]);

            done();
          }
        );
      });
    });
  });

  // Create
  describe('Create message', () => {
    describe('/api/v{n}/deals/{ID}/messages POST', () => {
      it('Success request', (done) => {
        const url = `${API_URL}${API_ROOT}/deals/1/messages`;
        request.post(
          {
            url: `${API_URL}${API_ROOT}/deals/1/messages`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
            form: {
              user_id: 2,
              title: 'Dúvida',
              message: 'Você tem 2 unidades do produto?',
            },
          },
          (err, response, body) => {
            const { message, error } = JSON.parse(response.body);
            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(message).to.be.an('object');
            expect(message.id).to.not.be.null;

            done();
          }
        );
      });
      it('Fail request', (done) => {
        const url = `${API_URL}${API_ROOT}/messages`;
        request.post(
          {
            url: `${API_URL}${API_ROOT}/deals/1/messages`,
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

  // Update
  describe('Update message', () => {
    describe('/api/v{n}/deals/1/messages/{ID} PUT', () => {
      it('Success request', (done) => {
        const newMessage = 'O produto ainda está disponível?';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/deals/1/messages/1`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
            form: {
              message: newMessage,
            },
          },
          (err, response, body) => {
            const { message, error } = JSON.parse(response.body);

            // status code expected
            expect(response.statusCode).to.equal(200);

            // data expected
            expect(message).to.be.an('object');
            expect(message.message).to.equal(newMessage);

            done();
          }
        );
      });
      it('Fail request', (done) => {
        const newDescription = 'Pagamento via cheque';
        request.put(
          {
            url: `${API_URL}${API_ROOT}/deals/1/messages/99`,
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
