import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import jwt from 'jsonwebtoken' ;
import   dotenv from  'dotenv'
dotenv.config();

chai.use(chaiHttp);
chai.should();

describe('user send order request', () => {

    const user_token = {
      id:3 ,
      email:"emmanuel2@gmail.com",
      is_admin:'false',
    };
    const token =jwt.sign({user_token}, process.env.SECRET);
    it('user should be able to send purchase request of car', (done) => {

      const order={
          car_id:2,
          amount:12000, 
      };
      chai.request(app)
        .post('/api/v2/order')
        .set('x-auth-token', token)
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(200)
          done();
        });
    });  


    it('when user send request twice', (done) => {

        const order={
            car_id:2,
            amount:12000, 
        };
        chai.request(app)
          .post('/api/v2/order')
          .set('x-auth-token', token)
          .send(order)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.body.should.have.property('error');
            res.body.should.have.property('status').eql(400)
            done();
          });
      });

      it('when user send request to marked car', (done) => {

        const order={
            car_id:1,
            amount:12000, 
        };
        chai.request(app)
          .post('/api/v2/order')
          .set('x-auth-token', token)
          .send(order)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('status').eql(400)
            done();
          });
      });
    
      it('when user send order to car not exist', (done) => {

        const order={
            car_id:70,
            amount:12000, 
        };
        chai.request(app)
          .post('/api/v2/order')
          .set('x-auth-token', token)
          .send(order)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('status').eql(400)
            done();
          });
      });

    it('if data not valid', (done) => {
        const user_token = {
            id:1,
            email:"emmanuel@gmail.com",
            is_admin:'false',
          };
        const token =jwt.sign({user_token}, process.env.SECRET);

        const order={
            car_id:"ttt",
            ammount:12000, 
        };
     
      chai.request(app)
        .post('/api/v2/order')
        .set('x-auth-token', token)
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('error');     
          res.body.should.have.property('status').eql(400)
          done();
        });
    });   
});
