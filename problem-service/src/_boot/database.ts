import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async () => {
  
  try {
    await mongoose.connect(String(process.env.MONGO_URL).trim()),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};