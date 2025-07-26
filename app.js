const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serve the testing site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route
app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const servicesRoutes = require('./routes/services');
const portfolioRoutes = require('./routes/portfolio');
const newsRoutes = require('./routes/news');
const contactRequestsRoutes = require('./routes/contactRequests');
const meetingsRoutes = require('./routes/meetings');
const briefsRoutes = require('./routes/briefs');
const dashboardRoutes = require('./routes/dashboard');
const requestsRoutes = require('./routes/requests');
const adminRoutes = require('./routes/admin');

app.use('/services', servicesRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/news', newsRoutes);
app.use('/contact-requests', contactRequestsRoutes);
app.use('/meetings', meetingsRoutes);
app.use('/briefs', briefsRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/requests', requestsRoutes);
app.use('/admin', adminRoutes);

module.exports = app;
