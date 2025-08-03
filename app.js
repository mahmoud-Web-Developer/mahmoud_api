const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Configuration
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware setup
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files serving
app.use(express.static(path.join(__dirname, 'public')));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime()
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

// Root route - serve the testing site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Import and use routes
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
const clientsRoutes = require('./routes/clients');
const contentRoutes = require('./routes/content');
const contentManagementRoutes = require('./routes/contentManagement');
const requestsManagementRoutes = require('./routes/requestsManagement');
const notificationsRoutes = require('./routes/notifications');

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
  { path: '/admin', router: adminRoutes },
  { path: '/clients', router: clientsRoutes },
  { path: '/content', router: contentRoutes },
  { path: '/content-management', router: contentManagementRoutes },
  { path: '/requests-management', router: requestsManagementRoutes },
  { path: '/notifications', router: notificationsRoutes }
];

// Register all API routes
apiRoutes.forEach(({ path, router }) => {
  app.use(`/api${path}`, router);
});

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

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 API status: http://localhost:${PORT}/api`);
  });
}

module.exports = app;
