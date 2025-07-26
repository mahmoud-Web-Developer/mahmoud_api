/**
 * Database Configuration
 * Centralized database configuration for the application
 */

const config = {
  // Development environment
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'the_flow_dev',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },

  // Production environment
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },

  // Test environment
  test: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'the_flow_test',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    pool: {
      max: 1,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Get current environment configuration
const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return config[env] || config.development;
};

// Validate required environment variables
const validateConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  const currentConfig = config[env];

  if (!currentConfig) {
    throw new Error(`Invalid environment: ${env}`);
  }

  // Validate required fields for production
  if (env === 'production') {
    const requiredFields = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
    const missingFields = requiredFields.filter(field => !process.env[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required environment variables: ${missingFields.join(', ')}`);
    }
  }

  return true;
};

module.exports = {
  config,
  getConfig,
  validateConfig
}; 