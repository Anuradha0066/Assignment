import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes';
import errorMiddleware from './middlewares/error.middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

/* ------------------ CORS MUST COME FIRST ------------------ */
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://candid-cheesecake-00f96c.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true,
}));

app.options('*', cors()); // ✅ VERY IMPORTANT

/* ------------------ MIDDLEWARE ------------------ */
app.use(express.json());
app.use(cookieParser());

/* ------------------ ROUTES ------------------ */
app.get('/', (_req, res) => {
  res.json({
    message: 'TaskFlow Backend API ✅',
    health: 'ok',
    endpoints: ['/api/v1/auth/register', '/api/v1/tasks']
  });
});

app.use('/api', apiRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

/* ------------------ ERROR HANDLER ------------------ */
app.use(errorMiddleware);

export default app;
