import express from 'express';
import pool from '../../config/config.js'

const viewall=(req,res)=>{
    if(req.query.status ||req.query.Body_type){
        const status=req.query.status;
        const min_price=req.query.min_price;
        const max_price=req.query.max_price;
        const state=req.query.state;
        const manufacturer=req.query.manufacturer;
        const body_type=req.query.Body_type;
        
         if(status && !max_price && !max_price && !state && !manufacturer && !body_type) {
                const selectQuery='SELECT * FROM cars where status=$1';
                pool.query(selectQuery,[status],(error,result)=>{
                    if(error)return res.status(400).json({
                        status:400,
                        error:'error ocured when selection is in executed'
                    })
                    if(result.rows.length>0){
                        return res.status(200).json({
                        status:200,
                        data:result.rows
                        })
                    }else{
                        return res.status(400).json({
                            status:400,
                            message:'no record found for car advertisement with this status'
                            })
                    }
                });
           }
        
           else if(status && max_price  && max_price && !state && !manufacturer && !body_type) {
            const selectQuery='SELECT * FROM cars where status=$1 AND price>=$2 AND price <=$3';
            pool.query(selectQuery,[status,min_price,max_price],(error,result)=>{
                if(error)return res.status(400).json({
                    status:400,
                    error:'error ocured when selection is in executed'
                })
                if(result.rows.length>0){
                    return res.status(200).json({
                    status:200,
                    data:result.rows
                    })
                }else{
                    return res.status(400).json({
                        status:400,
                        message:'no record found for car advertisement with this price range'
                        })
                }
            });  
       }
    
       else if(status && state && !max_price  && !max_price  && !manufacturer && !body_type) {
        const selectQuery='SELECT * FROM cars where status=$1 AND state=$2';
        pool.query(selectQuery,[status,state],(error,result)=>{
            if(error)return res.status(400).json({
                status:400,
                error:'error ocured when selection is in executed'
            })
            if(result.rows.length>0){
                return res.status(200).json({
                status:200,
                data:result.rows
                })
            }else{
                return res.status(400).json({
                    status:400,
                    error:'no record found for car advertisement with this state '
                    })
            }
        });
    
    
    }
    
    
    else if(status  && manufacturer && !state && !max_price  && !max_price  && !body_type) {
        const selectQuery='SELECT * FROM cars where status=$1 AND manufacturer=$2';
        pool.query(selectQuery,[status,manufacturer],(error,result)=>{
            if(error)return res.status(400).json({
                status:400,
                error:'error ocured when selection is in executed'
            })
            if(result.rows.length>0){
                return res.status(200).json({
                status:200,
                data:result.rows
                })
            }else{
                return res.status(400).json({
                    status:400,
                    error:'no record found for car advertisement with this manufacturer '
                    })
            }
        });
    
    
    }
    
    
    else if(!status  && !manufacturer && !state && !max_price  && !max_price  && body_type) {
        const selectQuery='SELECT * FROM cars where Body-type=$1';
        pool.query(selectQuery,[body_type],(error,result)=>{
            if(error)return res.status(400).json({
                status:400,
                error:'error ocured when selection is in executed'
            })
            if(result.rows.length>0){
                return res.status(200).json({
                status:200,
                data:result.rows
                })
            }else{
                return res.status(400).json({
                    status:400,
                    error:'no record found for car advertisement with this manufacturer '
                    })
            }
        });
    
    
    }
    
}
    
            
     
      else{

        const owner=req.user_token.user_token;
        if(owner.is_admin=='true'){

            const selectQuery='SELECT * FROM cars';
            pool.query(selectQuery,(error,result)=>{
                if(error)return res.status(400).json({
                    status:400,
                    error:'error ocured when selection is in executed'
                })
                if(result.rows.length>0){
                    return res.status(200).json({
                    status:200,
                    data:result.rows
                    })
                }else{
                    return res.status(400).json({
                        status:400,
                        message:'no record found for car advertisement'
                        })
                }
            });
            
        }else{
            return res.status(400).json({
                status:400,
                message:'use correct key word or logged in as admin'
                })  
        }
        }
    }
    export default viewall;