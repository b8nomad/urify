import mongoose, { type Connection, type ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI: string = process.env.MONGODB_URI || " ";

if (!URI) {
  throw new Error("MONGO URI not found");
}

interface MongooseConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const global = globalThis as unknown as {
  mongoose: MongooseConnection;
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
