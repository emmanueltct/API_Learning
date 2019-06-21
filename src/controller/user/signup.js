import express from 'express';
import bodyparser from 'body-parser';
import jwt from 'jsonwebtoken' ;
import signupvalidation from  '../../validation/user.validation';
import pool from '../../config/config.js'

const createNewUser=(req,res)=>{
  const {error}=signupvalidation(req.body);
  if(error)return res.status(400).json({
  status:400,
  error:error.details[0].message
  });

const user_data=[
    req.body.email,
    req.body.first_name,
    req.body.last_name,
    req.body.password,
    req.body.address
]

 
const check_email = 'SELECT * FROM users WHERE email = $1';
pool.query(check_email, [req.body.email], (error, answer) => {
  
  if (answer.rows.length>0){
    return res.status(409).json({
      status:409,
      message:'the user email already exist if you have account go to login page or try an other email'
    })
  }
  else{
  
    const createQuery = 'INSERT INTO users(email,first_name,last_name,password, address) VALUES($1, $2, $3, $4, $5) returning *';
    pool.query(createQuery,user_data, (error, results) => {
            if (error) {
              res.status(400).json({
                status:400,
                error:error.detail
              });
            }
            const user_token={
            id:results.rows[0].id,
            email:results.rows[0].email,
            is_admin:results.rows[0].is_admin
            }
            const token = jwt.sign({ user_token }, process.env.SECRET,{expiresIn:'1d'});
            res.header('x-auth-token', token)
            return res.status(201).json({
                status:201,
                message:'account successfull created',
                token:token,
                data:results.rows
              });
          })
      }
});
}
    export default createNewUser;