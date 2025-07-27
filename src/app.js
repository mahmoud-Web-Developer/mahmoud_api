const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const servicesRoutes = require('./routes/services');
const portfolioRoutes = require('./routes/portfolio');
const newsRoutes = require('./routes/news');
const contactRequestsRoutes = require('./routes/contactRequests');
const meetingsRoutes = require('./routes/meetings');
const briefsRoutes = require('./routes/briefs');
const dashboardRoutes = require('./routes/dashboard');
const requestsRoutes = require('./routes/requests');
const adminRoutes = require('./routes/admin');

// Initialize express app
const app = express();

// Configuration
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware setup
const setupMiddleware = () => {
  // CORS configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true
  }));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Static files serving
  app.use(express.static(path.join(__dirname, '../public')));

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
};

// Route setup
const setupRoutes = () => {
  // Health check route - more robust for Railway
  app.get('/health', (req, res) => {
    try {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        pid: process.pid
      });
    } catch (error) {
      console.error('Health check error:', error);
      res.status(500).json({
        status: 'ERROR',
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Simple health check for Railway
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'The Flow API is running',
      timestamp: new Date().toISOString()
    });
  });

  // API status route
  app.get('/api', (req, res) => {
    res.json({
      message: 'API is running',
      version: '1.0.0',
      environment: NODE_ENV
    });
  });

  // API routes
  const apiRoutes = [
    { path: '/auth', router: authRoutes },
    { path: '/services', router: servicesRoutes },
    { path: '/portfolio', router: portfolioRoutes },
    { path: '/news', router: newsRoutes },
    { path: '/contact-requests', router: contactRequestsRoutes },
    { path: '/meetings', router: meetingsRoutes },
    { path: '/briefs', router: briefsRoutes },
    { path: '/dashboard', router: dashboardRoutes },
    { path: '/requests', router: requestsRoutes },
    { path: '/admin', router: adminRoutes }
  ];

  // Register all API routes
  apiRoutes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};

// Error handling middleware
const setupErrorHandling = () => {
  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
      path: req.originalUrl,
      method: req.method
    });
  });

  // Global error handler
  app.use((error, req, res, next) => {
    console.error('Error:', error);
    
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    
    res.status(statusCode).json({
      success: false,
      message,
      ...(NODE_ENV === 'development' && { stack: error.stack })
    });
  });
};

// Initialize application
const initializeApp = () => {
  try {
    setupMiddleware();
    setupRoutes();
    setupErrorHandling();
    
    console.log('✅ Application initialized successfully');
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🚀 Server ready on port ${PORT}`);
    
    return app;
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    process.exit(1);
  }
};

// Export the initialized app
module.exports = initializeApp(); 