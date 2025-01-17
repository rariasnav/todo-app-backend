import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { z } from "zod";


export const registerUser = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { name, email, password } = z
        .object({
            name: z.string().min(1, "Name is required"),
            email: z.string().email("Invalid email"),
            password: z.string().min(6, "Password must be at least 6 characters"),
        })
        .parse(req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { email, password } = z
        .object({
            email: z.string().email("Invalid email"),
            password: z.string().min(6, "Password must be at least 6 characters"),
        })
        .parse(req.body);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};