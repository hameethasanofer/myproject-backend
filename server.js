import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS FIX — Allow both local dev and production
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://myproject-frontend-nu.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// Logger (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root route
app.get('/', (req, res) => {
  res.send('API Running...');
});

// API Routes
app.use('/api/jobs', jobRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: `Not Found - ${req.originalUrl}`
  });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});


// Start server locally (not on Vercel serverless)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;