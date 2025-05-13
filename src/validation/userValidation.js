const Joi = require("joi");
const validateRequest = require('../middleware/validate');

function createUserSchema(req, res, next) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    userRoleId: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function updateUserSchema(req, res, next) {
  const schema = Joi.object({
    userName: Joi.string().empty(""),
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    email: Joi.string().email().empty(""),
    userRoleId: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

module.exports = {
  createUserSchema,
  updateUserSchema,
};
