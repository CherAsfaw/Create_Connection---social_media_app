import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () =>
      console.log('Database connected')
    );

    await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

export default connectDB;
