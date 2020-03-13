const request = require('supertest');
const mocha = require('mocha');
const should = require('should');
const app = require('./index');

describe('GET /', () => {
    it('should be ok', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                res.body.should.expect(200);
                done();
           });
    });
});