
import Joi from '@hapi/joi';
function loginvalidation(data) {
  const schema = {
    email:Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().min(5).max(30).required(),
  };
  return Joi.validate(data, schema);
}

export default loginvalidation;
