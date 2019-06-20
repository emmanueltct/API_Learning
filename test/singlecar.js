import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import jwt from 'jsonwebtoken' ;
import   dotenv from  'dotenv'
dotenv.config();

chai.use(chaiHttp);
chai.should();

describe('can make view on single car', () => {

    it('user can check details information of single car', (done) => {
      chai.request(app)
        .get('/api/v2/car/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(200)
          done();
        });
    });  

    it('user can check details information of single car but not exist', (done) => {
      chai.request(app)
        .get('/api/v2/car/100')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.an('object');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(404)
          done();
        });
      });

    
});
