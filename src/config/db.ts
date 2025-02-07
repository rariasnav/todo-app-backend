import mongoose from "mongoose";
import vEnvConfig from "./vEnvConfig";


const connectDB = async () => {
    const mongoUri = vEnvConfig.mongoUri;
    if (!mongoUri) {
        console.error("MONGO_URI is not defined");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("Mongo DB connected succesfully");
    } catch (error) {
        console.error("Mongo DB connectio failed", error);
        process.exit(1);
    }
};

export default connectDB;