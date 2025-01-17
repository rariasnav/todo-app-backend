import { Router } from "express";
import { authenticateJWT } from "../middleware/jwtAuth";
import { 
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask, 
} from "../controllers/taskController";

const router = Router();

router.post("/todos",authenticateJWT, createTask);
router.get("/todos",authenticateJWT, getTasks);
router.get("/todos/:id",authenticateJWT, getTaskById);
router.put("/todos/:id",authenticateJWT, updateTask);
router.delete("/todos/:id",authenticateJWT, deleteTask);

export default router;