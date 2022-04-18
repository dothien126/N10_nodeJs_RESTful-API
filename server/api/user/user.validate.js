const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const { validate } = require('./user.model');

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validateResult = schema.validate({param: req.params[name]})
    if(validateResult.error) {
      return res.status(StatusCodes.BAD_REQUEST).json(validateResult.error)
    } else {
      next()
    }
  }
}

//validate data user
const validateUser = (schema) => {
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

// define user schema
const userSchemaValidate = {
  userSchema: Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'vn'] },
    }),
    job: Joi.string().min(3).max(30).required(),
  }),
};

const idSchema = Joi.object().keys({
  param: Joi.string().regex(/^[0-9a-f-A-F]{24}$/).required()
})

module.exports = {
  userSchemaValidate,
  idSchema,
  validateUser,
  validateParam,
};
