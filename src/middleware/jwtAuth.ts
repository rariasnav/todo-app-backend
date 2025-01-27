import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types/CustomRequest";

export const authenticateJWT = (
    req: AuthenticatedRequest, 
    res: Response, 
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authorization token missing or invalid" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ message: "Token expired" });
                return;
            }
            res.status(401).json({ message: "Invalid or expired token" });
            return;
        }

        res.status(500).json({ message: "An unknown error occurred" });
    }
}