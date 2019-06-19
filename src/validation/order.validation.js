
import Joi from '@hapi/joi';

function ordervalidation (data){
    const  orderschema ={
            car_id:Joi.number().integer().required(),
            amount :Joi.number().required(),
    }
  return  Joi.validate(data,orderschema);  
}

function orderUpdatevalidation (data2){
    const  updateschema ={
            amount :Joi.number().required(),
    }
  return  Joi.validate(data2,updateschema);  
}

export {ordervalidation,orderUpdatevalidation};
