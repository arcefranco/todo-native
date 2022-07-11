import { Router } from "express";
import { getTasks, getTask, getTaskCount, createTask, deleteTask, updateTask } from "../controllers/tasks";
const router = Router()

/**
 * @swagger
 * /tasks:
 *      get:
 *          summary: Get all tasks
 */
router.get('/tasks', getTasks)
/**
 * @swagger
 * /tasks:
 *      get:
 *          summary: Get an especific task by id
 */
router.get('/tasks/:id', getTask)
/**
 * @swagger
 * /tasks/count:
 *      get:
 *          summary: Get tasks total count
 */
router.get('/tasks/count', getTaskCount)
/**
 * @swagger
 * /tasks:
 *      post:
 *          summary: Create a task
 */
router.post('/tasks', createTask)
/**
 * @swagger
 * /tasks:
 *      delete:
 *          summary: Delete a task
 */
router.delete('/tasks/:id',deleteTask)
/**
 * @swagger
 * /tasks:
 *      put:
 *          summary: Update a task
 */
router.put('/tasks/:id',updateTask)

export default router