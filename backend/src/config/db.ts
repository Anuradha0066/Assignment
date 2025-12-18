import mongoose from 'mongoose';
import { MONGO_URI } from './env';

export async function connectDB(uri?: string): Promise<void> {
  try {
    const mongoUri = uri || MONGO_URI;

    if (!mongoUri) {
      throw new Error('MongoDB URI is missing');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed', error);
    process.exit(1);
  }
}

export default connectDB;
