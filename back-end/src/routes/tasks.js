import { Router } from "express";
import { getTasks, getTask, getTaskCount, createTask, deleteTask, updateTask } from "../controllers/tasks";
const router = Router()

router.get('/tasks', getTasks)
router.get('/tasks/:id', getTask)
router.get('/tasks/count', getTaskCount)
router.post('/tasks', createTask)
router.delete('/tasks/:id',deleteTask)
router.put('/tasks/:id',updateTask)
export default router