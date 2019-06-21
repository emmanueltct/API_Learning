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
    it('admin delete car', (done) => {
     
      chai.request(app)
        .delete('/api/v2/car/2')
        .set('x-auth-token', token)

        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('status').eql(200)
          done();
        });
    });  
    it('whene try to delete un existing car', (done) => {
      
      chai.request(app)
        .delete('/api/v2/car/90000')
        .set('x-auth-token', token)  
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('status').eql(404)
          done();
        });
    });  


    
    it('when the user is not admin and want to delete car', (done) => {
        const user_token = {
            id:1,
            email:"emmanuel@gmail.com",
            is_admin:'false',
          };
          const token =jwt.sign({user_token}, process.env.SECRET)
      chai.request(app)
        .delete('/api/v2/car/2')
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message');
          res.body.should.have.property('status').eql(400)
          done();
        });
    });  
});
