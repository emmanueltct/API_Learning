import express from 'express';
import pool from '../../config/config.js'
import {createvalidation } from '../../validation/car.validation';



const createNewCar=(req,res)=>{
  
const {error}=createvalidation(req.body);
if(error)return res.status(400).json({
  status:400,
  error:error.details[0].message
})

const owner=req.user_token.user_token;
const owner_id=owner.id;
const car_data=[
    owner.id,
    req.body.state,
    req.body.price,
    req.body.manufacturer,
    req.body.model,
    req.body.body_type
]

const check_query = 'SELECT * FROM users WHERE id=$1';
pool.query(check_query ,[owner_id], (error,answer)=>{
  
  if(answer.rows[0].email===owner.email){
    const createQuery = 'INSERT INTO cars (owner_id,state,price,manufacturer,model,body_type) VALUES($1, $2, $3, $4, $5,$6) returning *';
    pool.query(createQuery,car_data, (error, result) => {
      if (error) {
        res.status(400).json({
          status:400,
          error:'data not inserted the error ocured try again'
        });
      }

      return res.status(201).json({
        status:201,
        message:'car advertisement successful recorded',
        data:result.rows
      });
    })
  }else{
    return res.status(400).json({
      status:400,
      error:'token information no longer exist',
    });
  }
});
}
    export default createNewCar;