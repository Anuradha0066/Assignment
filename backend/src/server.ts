import http from 'http';
import app from './app';
import connectDB from './config/db';
import { initSocket } from './config/socket';
import { PORT } from './config/env';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    await connectDB();
    const server = http.createServer(app);
    initSocket(server); // ⚡ Socket.io initialized here
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
