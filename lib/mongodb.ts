import mongoose from 'mongoose'
import { MongoClient } from 'mongodb';



if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}
const MONGODB_URI = process.env.MONGODB_URI



export const createDbConnection = async () => {
  try {
    mongoose.set('strictQuery', false);
    return mongoose.connect(MONGODB_URI, { dbName: process.env.DB_NAME })
  } catch (error) {
    throw new Error(
      'Error during createDbConnection'
    )
  }
}


export const mongoDbConnectionForAdapter = () => {
  let client;
  let clientPromise: Promise<any>;
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
  }

  return clientPromise;
}