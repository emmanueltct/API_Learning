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
     
                const check_car = 'SELECT * FROM cars WHERE id=$1';
                pool.query(check_car ,[req.body.car_id], (error,response1)=>{
                    if(response1.rows.length>0){
                        if(response1.rows[0].owner_id==owner_id){
                            return res.status(400).json({
                                status:400,
                                message:'you can not make order of your own car'
                            })
                        }

                        if(response1.rows[0].status=='available'){
                            const check_orders = 'SELECT * FROM orders WHERE car_id=$1 AND buyer=$2';
                            pool.query(check_orders ,[req.body.car_id,owner_id], (error,response2)=>{ 
                                
                                if(response2.rows.length>0){
                                    return res.status(400).json({
                                        status:400,
                                        error:'you can not sent this order because you have sent before'
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
      

    export default createNewOrder;