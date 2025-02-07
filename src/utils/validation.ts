import { z } from "zod";

export const taskSchema = z.object({
    title: z.string()
        .min(3, "Title must have at least 3 characters")
        .max(100, "Title must not exceed 100 characters"),
    description: z.string()
        .max(300, "Title must not exceed 300 characters")
        .optional(),
    completed: z.boolean().optional(),
});

export const taskIdSchema = z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid task ID"),
});

export const registerUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

