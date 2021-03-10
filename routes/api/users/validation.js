const Joi = require("joi");

const schemaUserValidation = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(5).max(20),
});

const schemaUserSubscriptionValidation = Joi.object({
  subscription: Joi.any().valid("free", "pro", "premium").required(),
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

module.exports.validateUser = (req, _res, next) => {
  return validate(schemaUserValidation, req.body, next);
};

module.exports.validateUserSubscription = (req, _res, next) => {
  return validate(schemaUserSubscriptionValidation, req.body, next);
};
