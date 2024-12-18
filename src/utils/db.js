import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://library:IhdvhLm7asJeXrli@libraryv2.dv5pp.mongodb.net/?retryWrites=true&w=majority";

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined!');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI,{
      dbName: 'libraryv2',
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
