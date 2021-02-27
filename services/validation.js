const Joi = require("joi");

const schemaContactValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(7).max(12),
  password: Joi.string().min(5).max(12),
  subscription: Joi.string(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.schemaContactValidation = (req, _res, next) => {
  return validate(schemaContactValidation, req.body, next);
};
