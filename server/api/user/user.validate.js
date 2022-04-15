const Joi = require('joi');

// define user schema 
const userSchema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','vn'] } }),
  job: Joi.string().min(3).max(30).required(),
});

module.exports = userSchema;