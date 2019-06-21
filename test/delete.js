import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import jwt from 'jsonwebtoken' ;
import   dotenv from  'dotenv'
dotenv.config();

chai.use(chaiHttp);
chai.should();

describe('delete car', () => {

  const user_token = {
    id:1,
    email:"emmanuel@gmail.com",
    is_admin:'true',
  };
  const token =jwt.sign({user_token}, process.env.SECRET)
    it('user should be able to post car', (done) => {
      const car={
          state:'new',
          price:12000,
          manufacturer:'Toyota',
          model:'v8',
          body_type:'private'
      };
      chai.request(app)
        .post('/api/v2/car')
        .set('x-auth-token', token)
        .send(car)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(201)
          done();
        });
    });  
    it('car ad 1', (done) => {
      const car={
          state:'new',
          price:6000,
          manufacturer:'Toyota',
          model:'v8',
          body_type:'trailer'
      };
      chai.request(app)
        .post('/api/v2/car')
        .set('x-auth-token', token)
        .send(car)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(201)
          done();
        });
    });  


    
    it('car ad 2', (done) => {
      const car={
          state:'new',
          price:1000,
          manufacturer:'Toyota',
          model:'v8',
          body_type:'tax'
      };
      chai.request(app)
        .post('/api/v2/car')
        .set('x-auth-token', token)
        .send(car)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(201)
          done();
        });
    });  






    it('if data not valid', (done) => {
      const car= {
          price:'hhhghg',
          manufacturer:'Toyota',
          model:'v8',
          body_type:'private'
      };
      chai.request(app)
        .post('/api/v2/car')
        .set('x-auth-token', token)
        .send(car)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('error');     
          res.body.should.have.property('status').eql(400)
          done();
        });
    });  
    it('if no token generated', (done) => {
      const car=[{
          state:'new',
          price:12000,
          manufacturer:'Toyota',
          model:'v8',
          body_type:'private'
      }
    ];
      chai.request(app)
        .post('/api/v2/car')
        .send(car)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('error');     
          res.body.should.have.property('status').eql(400)
          done();
        });
    });  

    it('if no token not verfied', (done) => {
      const car= {
          state:'new',
          price:12000,
          manufacturer:'Toyota',
          model:'v8',
          body_type:'private'
      };
      chai.request(app)
        .post('/api/v2/car')
        .send(car)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('error');     
          res.body.should.have.property('status').eql(400)
          done();
        });
    });  
});
