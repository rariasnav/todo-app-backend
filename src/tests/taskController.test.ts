import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

describe("Task Controller CRUD Tests", () => {
    let token: string;
    let taskId: string;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI || "");

        const loginResponse = await request(app).post("/api/auth/login").send({
            email: "testuser@example.com",
            password: "password123",
        });

        token = loginResponse.body.token;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should create a task successfully", async () => {
        const taskData = {
            title: "Test Task",
            description: "This is a test task",
            completed: false,
            };
        
            const response = await request(app)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send(taskData);
        
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("_id");
            expect(response.body.title).toBe(taskData.title);
            expect(response.body.description).toBe(taskData.description);
            expect(response.body.completed).toBe(taskData.completed);
        
            taskId = response.body._id;
        });

        it("should retrieve all tasks", async () => {
            const response = await request(app)
                .get("/api/todos")
                .set("Authorization", `Bearer ${token}`);
        
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it("should retrieve a task by ID", async () => {
            const response = await request(app)
                .get(`/api/todos/${taskId}`)
                .set("Authorization", `Bearer ${token}`);
        
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("_id", taskId);
            expect(response.body.title).toBe("Test Task");
            expect(response.body.description).toBe("This is a test task");
        });

        it("should update a task successfully", async () => {
            const updatedTask = {
                title: "Updated Test Task",
                description: "This is an updated test task",
                completed: true,
            };
        
            const response = await request(app)
                .put(`/api/todos/${taskId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(updatedTask);
        
            expect(response.status).toBe(200);
            expect(response.body.title).toBe(updatedTask.title);
            expect(response.body.description).toBe(updatedTask.description);
            expect(response.body.completed).toBe(updatedTask.completed);
        });

        it("should delete a task successfully", async () => {
            const response = await request(app)
                .delete(`/api/todos/${taskId}`)
                .set("Authorization", `Bearer ${token}`);
        
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "Task deleted successfully");
        
            const verifyResponse = await request(app)
                .get(`/api/todos/${taskId}`)
                .set("Authorization", `Bearer ${token}`);
        
            expect(verifyResponse.status).toBe(404);
        });
});