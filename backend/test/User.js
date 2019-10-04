process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../src/models/User');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const should = chai.should();

mongoose.models = {};
mongoose.modelSchemas = {};

chai.use(chaiHttp);

describe('User', function() {
    beforeEach(function(done) {
        User.deleteMany({}, function(error) {
            done();
        });
    });
 
    describe('should make the login', function() {
        it('should create a new user and make the login', function(done) {
            const email = 'test@gmail.com';
            chai.request(server)
                .post('/users')
                .send({ email})
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.email.should.be.equal(email);
                done();
                });
        });
        it('should just make the login because the user exists', function(done) {
            const email = 'test_exists@gmail.com';
            User.create({ email });
            chai.request(server)
                .post('/users')
                .send({ email })
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.email.should.be.equal(email);
                done();
                });
        });
    });
});