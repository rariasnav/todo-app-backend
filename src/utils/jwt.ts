import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" })
}

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    return jwt.verify(token, JWT_SECRET);
}