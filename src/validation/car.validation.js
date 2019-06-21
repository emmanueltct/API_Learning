import Joi from '@hapi/joi';

function createvalidation (data){
    const  carschema ={
            state:Joi.string().min(2).required().regex(/^[a-zA-Z]+$/).trim(),
            price :Joi.number().integer().positive().min(0).max(100000000).required(),
            manufacturer:Joi.string().min(2).required().trim(),
            model :Joi.string().min(2).required().trim(),
            body_type :Joi.string().min(2).required().trim()     
    }
  return  Joi.validate(data,carschema);  
}

function status_Updatevalidation (data2){
    const  statusSchema ={
            status:Joi.string().valid('available','sold').required()       
    }
  return  Joi.validate(data2,statusSchema );  
}

function price_Updatevalidation (data3){
    const  sellerPriceSchema ={       
            price :Joi.number().integer().positive().min(0).max(100000000).required()
    }
  return  Joi.validate(data3, sellerPriceSchema);  
}

export { status_Updatevalidation, price_Updatevalidation,createvalidation };
