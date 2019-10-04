process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Spot = require('../src/models/Spot');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

mongoose.models = {};
mongoose.modelSchemas = {};

chai.use(chaiHttp);
chai.should();

describe('Spot', function() {
    beforeEach(function(done) {
        Spot.deleteMany({}, function(error) {
            done();
        });
    });
 
    describe('index', function() {
        it("should return a list of spots", async () => {
            await Spot.create({
                user: '5d969fb293563a6ad7167279',
                thumbnail: 'example.png',
                company: 'Example Company',
                techs: ['ReactJS', 'NodeJs'],
                price: 85
            })
            await Spot.create({
                user: '5d969fb293569a6ad7167279',
                thumbnail: 'example2.png',
                company: 'Example Company 2',
                techs: ['ReactJS', 'PHP'],
                price: 99
            })
            chai.request(server)
                .get('/spots')
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                });
        });
    });
});