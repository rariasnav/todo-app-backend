import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("Mongo DB connected succesfully");
    } catch (error) {
        console.error("Mongo DB connectio failed", error);
        process.exit(1);
    }
};

export default connectDB;