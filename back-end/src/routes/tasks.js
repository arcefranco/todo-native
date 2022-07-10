import { Router } from "express";
import { getTasks } from "../controllers/tasks";
const router = Router()

router.get('/tasks', getTasks)
router.get('/tasks/:id')
router.get('/tasks/count')
router.post('/tasks')
router.delete('/tasks')
router.put('/tasks')
export default router