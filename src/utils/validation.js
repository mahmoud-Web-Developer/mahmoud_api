/**
 * Validation Utility
 * Centralized validation functions for API endpoints
 */

const Joi = require('joi');

class ValidationHelper {
  /**
   * User registration validation
   */
  static validateRegistration(data) {
    const schema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
          'string.alphanum': 'Username must contain only alphanumeric characters',
          'string.min': 'Username must be at least 3 characters long',
          'string.max': 'Username must be at most 30 characters long',
          'any.required': 'Username is required'
        }),
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': 'Please provide a valid email address',
          'any.required': 'Email is required'
        }),
      password: Joi.string()
        .min(6)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
        .required()
        .messages({
          'string.min': 'Password must be at least 6 characters long',
          'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
          'any.required': 'Password is required'
        }),
      role: Joi.string()
        .valid('user', 'admin')
        .default('user')
        .messages({
          'any.only': 'Role must be either "user" or "admin"'
        })
    });

    return schema.validate(data);
  }

  /**
   * User login validation
   */
  static validateLogin(data) {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': 'Please provide a valid email address',
          'any.required': 'Email is required'
        }),
      password: Joi.string()
        .required()
        .messages({
          'any.required': 'Password is required'
        })
    });

    return schema.validate(data);
  }

  /**
   * Service creation validation
   */
  static validateService(data) {
    const schema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
          'string.min': 'Title must be at least 3 characters long',
          'string.max': 'Title must be at most 100 characters long',
          'any.required': 'Title is required'
        }),
      description: Joi.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
          'string.min': 'Description must be at least 10 characters long',
          'string.max': 'Description must be at most 1000 characters long',
          'any.required': 'Description is required'
        }),
      price: Joi.number()
        .positive()
        .required()
        .messages({
          'number.base': 'Price must be a number',
          'number.positive': 'Price must be positive',
          'any.required': 'Price is required'
        }),
      category: Joi.string()
        .valid('web', 'mobile', 'design', 'marketing', 'other')
        .required()
        .messages({
          'any.only': 'Category must be one of: web, mobile, design, marketing, other',
          'any.required': 'Category is required'
        })
    });

    return schema.validate(data);
  }

  /**
   * Portfolio item validation
   */
  static validatePortfolio(data) {
    const schema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
          'string.min': 'Title must be at least 3 characters long',
          'string.max': 'Title must be at most 100 characters long',
          'any.required': 'Title is required'
        }),
      description: Joi.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
          'string.min': 'Description must be at least 10 characters long',
          'string.max': 'Description must be at most 1000 characters long',
          'any.required': 'Description is required'
        }),
      imageUrl: Joi.string()
        .uri()
        .required()
        .messages({
          'string.uri': 'Please provide a valid image URL',
          'any.required': 'Image URL is required'
        }),
      technologies: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
        .messages({
          'array.min': 'At least one technology must be specified',
          'any.required': 'Technologies are required'
        }),
      projectUrl: Joi.string()
        .uri()
        .optional()
        .messages({
          'string.uri': 'Please provide a valid project URL'
        })
    });

    return schema.validate(data);
  }

  /**
   * News article validation
   */
  static validateNews(data) {
    const schema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(200)
        .required()
        .messages({
          'string.min': 'Title must be at least 3 characters long',
          'string.max': 'Title must be at most 200 characters long',
          'any.required': 'Title is required'
        }),
      content: Joi.string()
        .min(50)
        .max(5000)
        .required()
        .messages({
          'string.min': 'Content must be at least 50 characters long',
          'string.max': 'Content must be at most 5000 characters long',
          'any.required': 'Content is required'
        }),
      author: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
          'string.min': 'Author name must be at least 2 characters long',
          'string.max': 'Author name must be at most 50 characters long',
          'any.required': 'Author is required'
        }),
      category: Joi.string()
        .valid('technology', 'business', 'design', 'development', 'general')
        .required()
        .messages({
          'any.only': 'Category must be one of: technology, business, design, development, general',
          'any.required': 'Category is required'
        })
    });

    return schema.validate(data);
  }

  /**
   * Contact request validation
   */
  static validateContactRequest(data) {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
          'string.min': 'Name must be at least 2 characters long',
          'string.max': 'Name must be at most 50 characters long',
          'any.required': 'Name is required'
        }),
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': 'Please provide a valid email address',
          'any.required': 'Email is required'
        }),
      phone: Joi.string()
        .pattern(/^[\+]?[1-9][\d]{0,15}$/)
        .optional()
        .messages({
          'string.pattern.base': 'Please provide a valid phone number'
        }),
      message: Joi.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
          'string.min': 'Message must be at least 10 characters long',
          'string.max': 'Message must be at most 1000 characters long',
          'any.required': 'Message is required'
        }),
      service: Joi.string()
        .valid('web', 'mobile', 'design', 'marketing', 'consultation', 'other')
        .optional()
        .messages({
          'any.only': 'Service must be one of: web, mobile, design, marketing, consultation, other'
        })
    });

    return schema.validate(data);
  }

  /**
   * Meeting request validation
   */
  static validateMeetingRequest(data) {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
          'string.min': 'Name must be at least 2 characters long',
          'string.max': 'Name must be at most 50 characters long',
          'any.required': 'Name is required'
        }),
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': 'Please provide a valid email address',
          'any.required': 'Email is required'
        }),
      phone: Joi.string()
        .pattern(/^[\+]?[1-9][\d]{0,15}$/)
        .optional()
        .messages({
          'string.pattern.base': 'Please provide a valid phone number'
        }),
      date: Joi.date()
        .greater('now')
        .required()
        .messages({
          'date.greater': 'Meeting date must be in the future',
          'any.required': 'Meeting date is required'
        }),
      duration: Joi.number()
        .integer()
        .min(30)
        .max(480)
        .default(60)
        .messages({
          'number.base': 'Duration must be a number',
          'number.integer': 'Duration must be a whole number',
          'number.min': 'Duration must be at least 30 minutes',
          'number.max': 'Duration must be at most 480 minutes (8 hours)'
        }),
      purpose: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
          'string.min': 'Purpose must be at least 10 characters long',
          'string.max': 'Purpose must be at most 500 characters long',
          'any.required': 'Purpose is required'
        })
    });

    return schema.validate(data);
  }

  /**
   * Pagination validation
   */
  static validatePagination(query) {
    const schema = Joi.object({
      page: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
          'number.base': 'Page must be a number',
          'number.integer': 'Page must be a whole number',
          'number.min': 'Page must be at least 1'
        }),
      limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(10)
        .messages({
          'number.base': 'Limit must be a number',
          'number.integer': 'Limit must be a whole number',
          'number.min': 'Limit must be at least 1',
          'number.max': 'Limit must be at most 100'
        }),
      search: Joi.string()
        .min(1)
        .max(100)
        .optional()
        .messages({
          'string.min': 'Search term must be at least 1 character long',
          'string.max': 'Search term must be at most 100 characters long'
        }),
      sort: Joi.string()
        .valid('asc', 'desc')
        .default('desc')
        .messages({
          'any.only': 'Sort must be either "asc" or "desc"'
        })
    });

    return schema.validate(query);
  }
}

module.exports = ValidationHelper; 