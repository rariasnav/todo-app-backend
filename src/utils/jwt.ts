import jwt from "jsonwebtoken";
import vEnvConfig from "../config/vEnvConfig";


export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" })
}

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    return jwt.verify(token, vEnvConfig.jwtSecret);
}