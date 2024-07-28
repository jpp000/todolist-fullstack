import { Router } from "express";
import * as tasksController from "../controllers/tasksController.js";
import { validateBodyToCreate, validateId, validateToUpdate } from "../middlewares/tasksMiddleware.js";

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Bem vindo a nossa API!" })
})

router.get('/tasks', tasksController.getAllTasksController)
router.post('/tasks', validateBodyToCreate, tasksController.createTaskController)
router.delete('/tasks/:id', validateId, tasksController.deleteTaskController)
router.put('/tasks/:id',validateToUpdate, tasksController.updateTaskController)

export default router