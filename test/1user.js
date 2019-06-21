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
        email: 'emmanuel@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel',
        password: '12345',
        address: 'kigali'
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(201)
          done();
        });
    });

    it('second account created', (done) => {
      const user = {
        email: 'emmanuel1@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel',
        password: '12345',
        address: 'kigali'
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(201)
          done();
        });
    });

    it('third account created', (done) => {
      const user = {
        email: 'emmanuel2@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel',
        password: '12345',
        address: 'kigali'
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(201)
          done();
        });
    });

    it('user can send invalid form data in signup', (done) => {
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
        email:'emmanuel@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel',
        password: '12345',
        address: 'kigali'
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('status').eql(409)
          done();
        });
    });
    it('user can send unnecessary parameter', (done) => {
      const user = {
        email:'emmanuel@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel', 
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

//  login part 

    it('user should be able to make login', (done) => {
      const user = {
        email: 'emmanuel@gmail.com',
        password: '12345',
      };
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(200)
          done();
        });
    });

    it('user can send invalid form data in  login form', (done) => {
      const user = {
        email: '',
        password: '12345'
       
      };
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400)
          done();
        });
    });

    it('when user email  not exist', (done) => {
      const user = {
        email:'emmanuelrrjjjjjjjjjjjjjrr@gmail.com',
        password: 'aaaaa',   
      };
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400)
          done();
        });
    });

      it('user can send invalid password', (done) => {
        const user = {
          email:'emmanuel@gmail.com',
          password:'hhhhhhhhhhhhhhhhh'
         
        };
        chai.request(app)
          .post('/api/v2/auth/signin')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.body.should.have.property('error');
            res.body.should.have.property('status').eql(400)
            done();
          });
      });
  

    it('user can send unnecessary parameter', (done) => {
      const user = {
        email:'emmanuel@gmail.com',
        first_name: 'munezero',
        last_name: 'emmanuel',
       
      };
      chai.request(app)
        .post('/api/v2/auth/signin')
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