import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { initDB } from './config/db.js';
import { loginAdmin } from './middleware/auth.js';

import eventsRouter from './routes/events.js';
import equipmentRouter from './routes/equipment.js';
import blogRouter from './routes/blog.js';
import testimonialsRouter from './routes/testimonials.js';
import teamRouter from './routes/team.js';
import messagesRouter from './routes/messages.js';
import settingsRouter from './routes/settings.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Debug: Log startup info
console.log('=== DHEBRONIX SERVER STARTING ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'not set');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('ADMIN_PASSWORD exists:', !!process.env.ADMIN_PASSWORD);

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// CORS - allow all origins for now
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug: Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  console.log('DEBUG: Login attempt received');
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Password is required' });
    const token = await loginAdmin(password);
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.log('DEBUG: Login error:', error.message);
    res.status(401).json({ error: error.message });
  }
});

// Mount routes
console.log('DEBUG: Mounting routes...');
app.use('/api/events', eventsRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/blog', blogRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/team', teamRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/upload', uploadRouter);
console.log('DEBUG: All routes mounted');

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  console.log('DEBUG: 404 for:', req.method, req.path);
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('DEBUG: Server error:', err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

const startServer = async () => {
  try {
    await initDB();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.log('WARNING: Server starting WITHOUT database connection');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=== SERVER RUNNING ON PORT ${PORT} ===`);
  });
};

startServer();