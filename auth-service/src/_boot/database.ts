import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async () => {
  console.log(process.env.MONGO_URL);
  try {
    await mongoose.connect(String(process.env.MONGO_URL).trim()),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
};
