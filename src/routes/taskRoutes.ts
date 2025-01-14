import { Router } from "express";
import checkJwt from "../middleware/auth";
import { 
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask, 
} from "../controllers/taskController";

const router = Router();

router.post("/todos", createTask);
router.get("/todos", getTasks);
router.get("/todos/:id", getTaskById);
router.put("/todos/:id", updateTask);
router.delete("/todos/:id", deleteTask);

export default router;