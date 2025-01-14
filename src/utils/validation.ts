import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});

export const taskIdSchema = z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid task ID"),
});

