

import Joi from '@hapi/joi';

function signupvalidation(data) {
  const schema = {
    email:Joi.string().required().email({ minDomainSegments: 2 }),
    first_name: Joi.string().min(4).required().trim(),
    last_name: Joi.string().min(4).required(),
    password: Joi.string().min(5).max(30).required(),
    address: Joi.string().min(2).required(),
  };
  return Joi.validate(data, schema);
}
export default signupvalidation;

