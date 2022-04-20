const Joi = require('joi');

const validateAuth = (schema) => {
  return (req, res, next) => {
    const validateResult = schema.validate(req.body);
    if (validateResult.error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: validateResult.error });
    } else {
      next();
    }
  };
};

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

const loginSchema = Joi.object().keys({
  email:Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'vn'] }
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports = { validateAuth, registerSchema, loginSchema };
