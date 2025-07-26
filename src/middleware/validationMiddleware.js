/**
 * Validation Middleware
 * Middleware for request validation using Joi schemas
 */

const ValidationHelper = require('../utils/validation');
const ResponseHandler = require('../utils/response');

class ValidationMiddleware {
  /**
   * Validate registration data
   */
  static validateRegistration(req, res, next) {
    const { error } = ValidationHelper.validateRegistration(req.body);
    
    if (error) {
      return ResponseHandler.validationError(res, error.details);
    }
    
    next();
  }

  /**
   * Validate login data
   */
  static validateLogin(req, res, next) {
    const { error } = ValidationHelper.validateLogin(req.body);
    
    if (error) {
      return ResponseHandler.validationError(res, error.details);
    }
    
    next();
  }

  /**
   * Validate service data
   */
  static validateService(req, res, next) {
    const { error } = ValidationHelper.validateService(req.body);
    
    if (error) {
      return ResponseHandler.validationError(res, error.details);
    }
    
    next();
  }

  /**
   * Validate portfolio data
   */
  static validatePortfolio(req, res, next) {
    const { error } = ValidationHelper.validatePortfolio(req.body);
    
    if (error) {
      return ResponseHandler.validationError(res, error.details);
    }
    
    next();
  }

  /**
   * Validate news data
   */
  static validateNews(req, res, next) {
    const { error } = ValidationHelper.validateNews(req.body);
    
    if (error) {
      return ResponseHandler.validationError(res, error.details);
    }
    
    next();
  }

  /**
   * Validate contact request data
   */
  static validateContactRequest(req, res, next) {
    const { error } = ValidationHelper.validateContactRequest(req.body);
    
    if (error) {
      return ResponseHandler.validationError(res, error.details);
    }
    
    next();
  }

  /**
   * Validate meeting request data
   */
  static validateMeetingRequest(req, res, next) {
    const { error } = ValidationHelper.validateMeetingRequest(req.body);
    
    if (error) {
      return ResponseHandler.validationError(res, error.details);
    }
    
    next();
  }

  /**
   * Validate pagination parameters
   */
  static validatePagination(req, res, next) {
    const { error } = ValidationHelper.validatePagination(req.query);
    
    if (error) {
      return ResponseHandler.validationError(res, error.details);
    }
    
    next();
  }

  /**
   * Generic validation middleware
   * @param {Function} validationFunction - Validation function to use
   */
  static validate(validationFunction) {
    return (req, res, next) => {
      const { error } = validationFunction(req.body);
      
      if (error) {
        return ResponseHandler.validationError(res, error.details);
      }
      
      next();
    };
  }
}

module.exports = ValidationMiddleware; 