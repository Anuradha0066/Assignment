// src/config/env.ts
import dotenv from 'dotenv';

dotenv.config(); // Load .env at the very start

// MongoDB connection string
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/backend';

// Server port
export const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// JWT secret key
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Node environment
export const NODE_ENV = process.env.NODE_ENV || 'development';
