import mongoose, { type Mongoose, ConnectOptions } from "mongoose";

import logger from "./logger";
import "@/database";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Global caching for Next.js to prevent multiple connections in dev mode
declare global {
  var mongooseConnection: MongooseCache;
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

export async function connectDB(): Promise<Mongoose> {
  if (cached?.conn) {
    logger.info("Using existing mongoose connection");
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      dbName: "notebook",
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        logger.info("Connected to MongoDB");
        return mongooseInstance;
      })
      .catch((error) => {
        logger.error("Error connecting to MongoDB", error);
        throw error;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
