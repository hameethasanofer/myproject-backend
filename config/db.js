import mongoose from 'mongoose';

// Cache connection across serverless invocations (Vercel)
let cached = global.mongooseCache;
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  // Reuse existing connection (warm serverless invocation)
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if none in progress
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false, // Don't buffer — fail fast on cold starts
      })
      .then((m) => {
        console.log(`MongoDB Connected: ${m.connection.host}`);
        return m;
      })
      .catch((err) => {
        cached.promise = null; // Reset so next request retries
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;