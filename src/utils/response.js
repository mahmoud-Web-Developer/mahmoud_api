/**
 * Response Utility
 * Standardized response format for API endpoints
 */

class ResponseHandler {
  /**
   * Success response
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Success message
   * @param {*} data - Response data
   */
  static success(res, statusCode = 200, message = 'Success', data = null) {
    const response = {
      success: true,
      message,
      ...(data && { data }),
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Error response
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {*} error - Error details
   */
  static error(res, statusCode = 500, message = 'Internal Server Error', error = null) {
    const response = {
      success: false,
      message,
      ...(error && { error }),
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Validation error response
   * @param {Object} res - Express response object
   * @param {Array} errors - Validation errors
   */
  static validationError(res, errors) {
    return this.error(res, 400, 'Validation Error', { errors });
  }

  /**
   * Not found response
   * @param {Object} res - Express response object
   * @param {string} message - Not found message
   */
  static notFound(res, message = 'Resource not found') {
    return this.error(res, 404, message);
  }

  /**
   * Unauthorized response
   * @param {Object} res - Express response object
   * @param {string} message - Unauthorized message
   */
  static unauthorized(res, message = 'Unauthorized') {
    return this.error(res, 401, message);
  }

  /**
   * Forbidden response
   * @param {Object} res - Express response object
   * @param {string} message - Forbidden message
   */
  static forbidden(res, message = 'Forbidden') {
    return this.error(res, 403, message);
  }

  /**
   * Created response
   * @param {Object} res - Express response object
   * @param {string} message - Created message
   * @param {*} data - Created data
   */
  static created(res, message = 'Resource created successfully', data = null) {
    return this.success(res, 201, message, data);
  }

  /**
   * Updated response
   * @param {Object} res - Express response object
   * @param {string} message - Updated message
   * @param {*} data - Updated data
   */
  static updated(res, message = 'Resource updated successfully', data = null) {
    return this.success(res, 200, message, data);
  }

  /**
   * Deleted response
   * @param {Object} res - Express response object
   * @param {string} message - Deleted message
   */
  static deleted(res, message = 'Resource deleted successfully') {
    return this.success(res, 200, message);
  }

  /**
   * Paginated response
   * @param {Object} res - Express response object
   * @param {Array} data - Data array
   * @param {number} page - Current page
   * @param {number} limit - Items per page
   * @param {number} total - Total items
   */
  static paginated(res, data, page, limit, total) {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return this.success(res, 200, 'Data retrieved successfully', {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  }
}

module.exports = ResponseHandler; 