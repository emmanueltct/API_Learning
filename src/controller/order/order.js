import express from 'express';
import pool from '../../config/config.js'
import {ordervalidation } from '../../validation/order.validation';



const createNewOrder=(req,res)=>{
        const {error}=ordervalidation(req.body);
        if(error)return res.status(400).json({
            status:400,
            error:error.details[0].message
            })

        

        const owner=req.user_token.user_token;
        const owner_id=owner.id;
        const car_data=[
            owner_id,
            req.body.car_id,
            req.body.amount
        ];

        const check_query = 'SELECT * FROM users WHERE id=$1';
        pool.query(check_query ,[owner_id], (error,answer)=>{
        
            if(answer.rows[0].email===owner.email){
                    
                const check_query = 'SELECT * FROM cars WHERE id=$1';
                pool.query(check_query ,[req.body.car_id], (error,answer1)=>{
                    if(answer1.rows.length>0){
                        if(answer1.rows[0].status=='available'){
                            const check_query = 'SELECT * FROM orders WHERE car_id=$1 AND buyer=$2';
                            pool.query(check_query ,[req.body.car_id,owner_id], (error,answer2)=>{ 
                                
                                if(answer2.rows.length>0){
                                    return res.status(400).json({
                                        status:400,
                                        error:'you can not sent this order because you have done before you can update you order price'
                                        });  
                                }else{
                                    
                                    const createQuery = 'INSERT INTO orders (buyer,car_id,amount) VALUES($1, $2, $3) returning *';
                                    pool.query(createQuery,car_data, (error, result) => {
                                    if (error) {
                                       return res.status(400).json({
                                        status:400,
                                        error:"car information not recorded try again"
                                        });
                                    }
                                        else{
                                            const lastinsert=result.rows[0].id;
                                            const selectQuery2 = 'SELECT orders.id,orders.buyer,orders.car_id,cars.price,orders.amount,orders.status,orders.created_on FROM orders,cars WHERE orders.id=$1 AND orders.car_id=cars.id';
                                            pool.query(selectQuery2,[lastinsert],(error,result2)=>{

                                                return res.status(200).json({
                                                    status:200,
                                                    message:'request order successful recorded',
                                                    data:result2.rows
                                                })
                                            });
                                        }

                                   
                                    })

                                }
                            });
                        }else{
                            return res.status(400).json({
                                status:400,
                                message:'this car is marked to be sold',
                                }); 
                        }
                    }else{
                        return res.status(400).json({
                            status:400,
                            message:'this car is not exist no information found',
                            });  
                    }   
             });
        }
        else{
            return res.status(400).json({
                status:400,
                message:'token information no longer exist',
                });  
        }   
    });
}
    export default createNewOrder;