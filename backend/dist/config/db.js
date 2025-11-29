import mongoose, {} from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URI || " ";
if (!URI) {
    throw new Error("MONGO URI not found");
}
const global = globalThis;
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
export default async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(URI, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
//# sourceMappingURL=db.js.map