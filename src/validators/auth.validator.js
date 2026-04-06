// src/validators/auth.validator.js
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// in auth.validator.js
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  role: Joi.string().valid("admin", "analyst", "viewer"),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
};