import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
} else {
    dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api", taskRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === "ZodError") {
        return res.status(400).json({ message: err.errors });
    }
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Validation error", details: err.message });
    }
    if (err.name === "CORS policy violation") {
        return res.status(403).json({ message: "CORS policy violation" });
    }
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

if (process.env.NODE_ENV !== "test") {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;