import express from 'express';
import pool from '../../config/config.js'
import {orderUpdatevalidation} from '../../validation/order.validation';
const priceUpdateOrder=(req,res)=>{
    const order_id=req.params.id;
    const{error}=orderUpdatevalidation(req.body);
    if(error)return res.status(400).json({
        status:400,
        error:error.details[0].message
    })
    const owner=req.user_token.user_token;
    const owner_id=owner.id;

    const selectQuery='SELECT * FROM orders WHERE id=$1';
    pool.query(selectQuery,[order_id], (error,response)=>{
        if(response.rows.length>0){ 
        
              
                if(response.rows[0].buyer===owner.id){
                    if(response.rows[0].status==='Pending'){  
                        const oldprice=response.rows[0].amount;
                            
                                const updateQuery='UPDATE orders SET amount=$1 where id=$2 returning *'
                                pool.query(updateQuery,[req.body.amount,order_id], (error,response2)=>{
                                        if(error)return res.status(400).json({
                                            status:400,
                                            error:'you have an error data not updated'
                                        })
                                        
                                        const data2={
                                            id:response2.rows[0].id,
                                            buyer:response2.rows[0].buyer,
                                            car_id:response2.rows[0].car_id,
                                            status:response2.rows[0].status,
                                            old_price_offered:oldprice,
                                            new_price_offered:response2.rows[0].amount
                                        }

                                        return res.status(200).json({
                                            status:200,
                                            message:'the order amount is updated successful',
                                            data:data2
                                        })
                                })
                    }else{
                       
                        return res.status(400).json({
                            status:400,
                            error:'you can update order request only if its status is Pendind' 
    
                            }); 
                    }       
                }else{
            
                        return res.status(404).json({
                        status:400,
                        error:'this order request belongs to another user! you can update it only if you are onwer' 

                        });
                        
                    }            
        }else{
        return res.status(404).json({
        status:404,
        error:`no request order found on this id ${order_id} `
            }) 
        }
 })
      
};

export default priceUpdateOrder;