
import Joi from '@hapi/joi';

function ordervalidation (data){
    const  orderschema ={
            car_id:Joi.number().integer().positive().min(0).required(),
            amount :Joi.number().integer().positive().min(0).max(100000000).required()
    }
  return  Joi.validate(data,orderschema);  
}

function orderUpdatevalidation (data2){
    const  updateschema ={
          amount :Joi.number().integer().positive().min(0).max(100000000).required()
    }
  return  Joi.validate(data2,updateschema);  
}

export {ordervalidation,orderUpdatevalidation};
