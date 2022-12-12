import mongoose from 'mongoose'



if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}
const MONGODB_URI = process.env.MONGODB_URI



export const createDbConnection = async () => {
  try {
    return mongoose.connect(MONGODB_URI, { dbName: process.env.DB_NAME })
  } catch (error) {
    throw new Error(
      'Error during createDbConnection'
    )
  }
}
