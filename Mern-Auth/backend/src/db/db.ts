import mongoose from 'mongoose';

async function connectDb(){
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`)
        console.log('Database connected');
    } catch (error) {
        console.log("MongoDb Connection Failure :",error);
        process.exit(1);
    }
}

export default connectDb;