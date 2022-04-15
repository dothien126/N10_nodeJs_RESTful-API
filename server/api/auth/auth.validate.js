const Joi = require('joi');

const registerSchema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'vn'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  job: Joi.string().min(3).max(30).required(),
});

module.exports = { registerSchema };
