import mongoose from 'mongoose';
import pg from 'pg'
import dotenv from 'dotenv';

const postgresPool = new pg.Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD   
});

if (!process.env.MONGO_CONNECTION_STRING) {
    throw new Error('Missing required environment variable: MONGO_CONNECTION_STRING')
}
const mongoDBConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
        console.log("MongoDB connected")
    } catch (err) {
        console.error("MongoDB connection error:", err)
    }
};

mongoDBConnect();