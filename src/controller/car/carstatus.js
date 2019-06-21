import express from 'express';
import pool from '../../config/config.js'
import {status_Updatevalidation} from '../../validation/car.validation';

const statusUpdateCar=(req,res)=>{
    const car_id=req.params.id;
    const{error}=status_Updatevalidation(req.body);
    if(error)return res.status(400).json({
        status:400,
        error:error.details[0].message
    })
    
    
    const owner=req.user_token.user_token;
    const owner_id=owner.id;

    const selectQuery='SELECT * FROM cars WHERE id=$1';
    pool.query(selectQuery,[car_id], (error,answer)=>{
        if(answer.rows.length>0){ 

            
           if(answer.rows[0].owner_id===owner.id) {
                if(answer.rows[0].status==='available') {
                        const updateQuery='UPDATE cars SET status=$1 where id=$2 returning *'
                        pool.query(updateQuery,[req.body.status,car_id], (error,answer)=>{
                                if(error)return res.status(400).json({
                                    status:400,
                                    error:'error occured in your update try again'
                                })

                                return res.status(200).json({
                                    status:200,
                                    message:'the car status is updated',
                                    data:answer.rows
                                })
                        })
                    }else{
                    
                        return res.status(400).json({
                        status:400,
                        error:'You can not mark this car because its aready marked to be sold' 
                        });  
                    } 
            }else{
                    return res.status(400).json({
                    status:400,
                    error:'you can not update this car because owned by other user' 

                    });
                    
                }            
        }else{
        return res.status(404).json({
        status:404,
       error:`no car found on this id ${car_id} `
            }) 
        }
    
    })
      
    };

        export default statusUpdateCar;