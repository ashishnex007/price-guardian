import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async() =>{
    mongoose.set('strictQuery',true);

    if(isConnected) return console.log('using existing connection');

    try {
        await mongoose.connect(String(process.env.MONGODB_URI));

        isConnected = true;

        console.log("MongoDB connection established => using new connection");

    } catch (error) {
        console.log(error);
    }

}