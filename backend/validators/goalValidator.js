const Joi = require('joi');

// Define the schema for goal validation
const goalSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.min': 'Title must be at least 3 characters long.',
    'any.required': 'Title is required.',
  }),
  description: Joi.string().optional(),
  dueDate: Joi.date().iso().optional().messages({
    'date.iso': 'Due date must be a valid ISO date.',
  }),
});

module.exports = goalSchema;
