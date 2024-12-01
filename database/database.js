import mongoose from 'mongoose';

const connectDB = async (db) => {
    console.log('Connected to dabatase');
    await mongoose.connect(db);
};

export default connectDB;