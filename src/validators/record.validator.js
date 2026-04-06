const Joi = require('joi');

const createRecordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().min(2).max(50).required(),
  date: Joi.date().optional(),
  note: Joi.string().max(255).optional(),
});

const updateRecordSchema = Joi.object({
  amount: Joi.number().positive(),
  type: Joi.string().valid('income', 'expense'),
  category: Joi.string().min(2).max(50),
  date: Joi.date(),
  note: Joi.string().max(255),
});

const getRecordsQuerySchema = Joi.object({
  startDate: Joi.date(),
  endDate: Joi.date(),
  type: Joi.string().valid("income", "expense"),
  category: Joi.string(),
});

module.exports = {
  createRecordSchema,
  updateRecordSchema,
  getRecordsQuerySchema,
};