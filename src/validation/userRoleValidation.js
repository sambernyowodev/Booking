const Joi = require("joi");
const validateRequest = require("../middleware/validate");

function createUserRoleSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateUserRoleSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
    description: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

module.exports = {
  createUserRoleSchema,
  updateUserRoleSchema,
};
