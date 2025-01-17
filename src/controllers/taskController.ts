import { AuthenticatedRequest } from "../types/CustomRequest";
import { Response, NextFunction } from "express";
import Task from "../models/Tasks";
import { taskSchema, taskIdSchema } from "../utils/validation";

export const createTask = async (
    req: AuthenticatedRequest, 
    res: Response, 
    next: NextFunction
    ): Promise<void> => {
    try {
        const { title, description, completed } = taskSchema.parse(req.body);

        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "User ID is missing in the token" });
            return;
        }

        const task = new Task({ title, description, completed, userId })
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
        res.status(401).json({ message: "User ID is missing in the token" });
        return;
        }

        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
        const { id } = taskIdSchema.parse(req.params);    
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "User ID is missing in the token" });
            return;
        }

        const task = await Task.findOne({ _id: id, userId });
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
    
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
        const { id } = taskIdSchema.parse(req.params);
        const { title, description, completed } = taskSchema.partial().parse(req.body);
    
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "User ID is missing in the token" });
            return;
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId },
            { title, description, completed },
            { new: true, runValidators: true }
        );
    
        if (!updatedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
    
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
        const { id } = taskIdSchema.parse(req.params);    
        const userId = req.userId;
        
        if (!userId) {
            res.status(401).json({ message: "User ID is missing in the token" });
            return;
        }
    
        const deletedTask = await Task.findOneAndDelete({ _id: id, userId });
        if (!deletedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
    
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};