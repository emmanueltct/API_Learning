import Joi from '@hapi/joi';

function createvalidation (data){
    const  carschema ={
            state:Joi.string().min(2).required().regex(/^[a-zA-Z]+$/).trim(),
            price :Joi.number().integer().positive().min(0).max(100000000).regex(/^[0-9.]+$/).required(),
            manufacturer:Joi.string().min(2).required().regex(/^[a-zA-Z]+$/).trim(),
            model :Joi.string().min(2).required().regex(/^[a-zA-Z]+$/).trim(),
            body_type :string().min(2).required().regex(/^[a-zA-Z]+$/).trim()
           
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
            price :Joi.number().required().required(), 
    }
  return  Joi.validate(data3, sellerPriceSchema);  
}

export { status_Updatevalidation, price_Updatevalidation,createvalidation };
