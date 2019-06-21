import express from 'express';
import pool from '../../config/config.js'

const deleteCar=(req,res)=>{
const car_id=req.params.id;
const owner=req.user_token.user_token;
if(owner.is_admin=='true'){

const selectQuery = 'SELECT * FROM cars WHERE id=$1';
pool.query(selectQuery,[car_id], (error,answer)=>{
    if(answer.rows.length>0){
        const deleteQuery = 'DELETE FROM cars WHERE id=$1';
        pool.query(deleteQuery,[car_id], (error,answer)=>{
            return res.status(200).json({
                status:200,
                message:`the car with this Id ${car_id} successful deleted `
            })
        })
    }else{
        return res.status(404).json({
            status:404,
            message:`no car found on this id ${car_id} `
        }) 
    }

})
}else{
    return res.status(400).json({
        status:400,
        message:'only admin can delete a car' 
});
}
};

export default deleteCar;