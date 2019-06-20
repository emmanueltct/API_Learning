import express from 'express';
import pool from '../../config/config.js'

const singleCar=(req,res)=>{
const car_id=req.params.id;

const selectQuery = 'SELECT * FROM cars WHERE id=$1';
pool.query(selectQuery,[car_id], (error,answer)=>{

    if(answer.rows.length>0){
        return res.status(200).json({
            status:200,
            data:answer.rows[0]
        })
    }else{
        return res.status(404).json({
            status:404,
            message:`no car found on this id ${car_id} `
        }) 
    }

})
  
};


    export default singleCar;