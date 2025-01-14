import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes); 
app.use("/api", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});