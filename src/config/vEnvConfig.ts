import dotenv from "dotenv";

dotenv.config();

const vEnvConfig = {
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],
    port: process.env.PORT || 5000,
};

export default vEnvConfig;