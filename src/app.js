const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const projectsRoutes = require('../routes/projects');

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

  // Basic API routes - simplified for deployment
  app.get('/auth', (req, res) => {
    res.json({ message: 'Auth endpoint ready' });
  });

  app.get('/services', (req, res) => {
    res.json({ message: 'Services endpoint ready' });
  });

  app.get('/portfolio', (req, res) => {
    res.json({ message: 'Portfolio endpoint ready' });
  });

  app.get('/news', (req, res) => {
    res.json({ message: 'News endpoint ready' });
  });

  app.get('/contact-requests', (req, res) => {
    res.json({ message: 'Contact requests endpoint ready' });
  });

  app.get('/meetings', (req, res) => {
    res.json({ message: 'Meetings endpoint ready' });
  });

  app.get('/briefs', (req, res) => {
    res.json({ message: 'Briefs endpoint ready' });
  });

  app.get('/dashboard', (req, res) => {
    res.json({ message: 'Dashboard endpoint ready' });
  });

  app.get('/requests', (req, res) => {
    res.json({ message: 'Requests endpoint ready' });
  });

  app.get('/admin', (req, res) => {
    res.json({ message: 'Admin endpoint ready' });
  });

  // Projects API routes - using real routes
  app.use('/projects', projectsRoutes);
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
    console.log('🚀 Initializing application...');
    setupMiddleware();
    console.log('✅ Middleware setup complete');
    setupRoutes();
    console.log('✅ Routes setup complete');
    setupErrorHandling();
    console.log('✅ Error handling setup complete');
    
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