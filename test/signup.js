import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import   dotenv from  'dotenv'
dotenv.config();

chai.use(chaiHttp);
chai.should();

describe('user signup', () => {
    it('user should be able to create account', (done) => {
      const user = {
        email: 'emmanuelllllttg44gyytttjjjjjl@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel',
        password: '12345',
        address: 'kigali'
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(200)
          done();
        });
    });

    it('suser can send invalid form data', (done) => {
      const user = {
        email: '',
        first_name: 'munezero',
        last_name: 'emmanuel',
        password: '12345',
        address: 'kigali'
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400)
          done();
        });
    });

    it('user can send an existing email', (done) => {
      const user = {
        email:'emmanuellllltttttjjjjjl@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel',
        password: '12345',
        address: 'kigali'
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('status').eql(400)
          done();
        });
    });

    it('user can send un necessary parameter', (done) => {
      const user = {
        id:1,
        email:'emmanuellllltttttjjjjjl@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel',
        password: '12345',
        address: 'kigali'
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400)
          done();
        });
    });
});