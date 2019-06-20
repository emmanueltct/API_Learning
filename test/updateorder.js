import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import jwt from 'jsonwebtoken' ;
import   dotenv from  'dotenv'
dotenv.config();

chai.use(chaiHttp);
chai.should();

describe('buyer update order', () => {
    const user_token = {
        id:3 ,
        email:"emmanuel2@gmail.com",
        is_admin:'false',
      };
    const token =jwt.sign({user_token}, process.env.SECRET);

      it('buyer can update price of request order', (done) => {
        const car= {
            amount:4000
        };
        
        chai.request(app)
          .patch('/api/v2/order/1/price')
          .set('x-auth-token', token)
          .send(car)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.should.have.property('status').eql(200)
            done();
          });
      });  

      it('update price of not existing order ', (done) => {
        const car= {
            amount:1000
        };
        chai.request(app)
          .patch('/api/v2/order/100/price')
          .set('x-auth-token', token)
          .send(car)
          .end((err, res) => {
            res.should.have.status(404);
            res.should.be.an('object');
            res.body.should.have.property('error');
            res.body.should.have.property('status').eql(404)
            done();
          });
        });

      it('invalid input data', (done) => {
          const car= {
            amount:''
          };
          
          chai.request(app)
            .patch('/api/v2/order/1/price')
            .set('x-auth-token', token)
            .send(car)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.an('object');
              res.body.should.have.property('error'),
              res.body.should.have.property('status').eql(400)
              done();
            });
        });  
    
      
        it('if your are not the owner of order  request', (done) => {
          const user_token = {
              id:1 ,
              email:"emmanuel@gmail.com",
              is_admin:'false',
            };
            const token2 =jwt.sign({user_token}, process.env.SECRET);
          const car= {
          
              status:'available' 
          };
          chai.request(app)
            .patch('/api/v2/order/1/price')
            .set('x-auth-token', token2)
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
