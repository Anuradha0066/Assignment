import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes';
import errorMiddleware from './middlewares/error.middleware';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (_req, res) => {
  res.json({ 
    message: 'TaskFlow Backend API ✅', 
    health: 'ok',
    endpoints: ['/api/v1/auth/register', '/api/v1/tasks']
  });
});


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:  'http://localhost:5173',
  credentials: true,
}));
app.use( apiRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorMiddleware);

export default app;
