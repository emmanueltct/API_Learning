import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import jwt from 'jsonwebtoken' ;
import   dotenv from  'dotenv'
dotenv.config();

chai.use(chaiHttp);
chai.should();


describe('vieww all unsold car', () => {
    const user_token = {
        id:1,
        email:"emmanuel@gmail.com",
        is_admin:'false',
      };
      const token =jwt.sign({user_token}, process.env.SECRET)

    it('user can vieww all unsold car with available status', (done) => {

      chai.request(app)
        .get('/api/v2/car/?status=available')
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(200);
         res.should.be.an('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(200)
          done(); 
        });
    }); 
    it('user can view all unsold car with available status but use bad keyword', (done) => {

        chai.request(app)
          .get('/api/v2/car/?status=avilble')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message');
            res.body.should.have.property('status').eql(400)
            done();
          });
      });  

      it('user can view all unsold car using price range', (done) => {

        chai.request(app)
          .get('/api/v2/car/?status=available&min_price=0&max_price=100000')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql(200)
          done();
          });
      });  

      it('user can view all unsold car using price range', (done) => {

        chai.request(app)
          .get('/api/v2/car/?status=available&min_price=1000000000&max_price=1000000000')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            
            res.body.should.have.property('message');
            res.body.should.have.property('status').eql(400)
          done();
          });
      });  

      it('user can view all unsold using the state condition', (done) => {
        chai.request(app)
          .get('/api/v2/car/?status=available&state=new')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.body.should.have.property('data');
            res.body.should.have.property('status').eql(200)
          done();
          });
      });  

      it('user can view all unsold using the state condition state not exist', (done) => {
        chai.request(app)
          .get('/api/v2/car/?status=available&state=wwwww')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('status').eql(400)
          done();
          });
      });  

      it('user can view all unsold using the manufacturer', (done) => {
        chai.request(app)
          .get('/api/v2/car/?status=available&manufacturer=Toyota')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.body.should.have.property('data');
            res.body.should.have.property('status').eql(200)
          done();
          });
      });  

      it('user can view all unsold using the manufacturer but no result found ', (done) => {
        chai.request(app)
          .get('/api/v2/car/?status=available&manufacturer=toyooota')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('status').eql(400)
          done();
          });
      });

      it('user can view all unsold using the body type but no result found ', (done) => {
        chai.request(app)
          .get('/api/v2/car/?body_type=trailerg')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message');
            res.body.should.have.property('status').eql(400)
          done();
          });
      });

      it('admin view all ', (done) => {
        const user_token = {
            id:1,
            email:"emmanuel@gmail.com",
            is_admin:'true',
          };
          const token =jwt.sign({user_token}, process.env.SECRET)

        chai.request(app)
          .get('/api/v2/car/')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.body.should.have.property('data');
            res.body.should.have.property('status').eql(200)
          done();
          });
      });
});
