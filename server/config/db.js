import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () =>
      console.log('Database connected')
    );

    await mongoose.connect(`${process.env.MONGODB_URL}/socialApp`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

export default connectDB;
