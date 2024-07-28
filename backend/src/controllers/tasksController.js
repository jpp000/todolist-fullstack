import { createTask, deleteTask, getAllTasks, updateTask } from "../models/taskModel.js"


export const getAllTasksController = async (req, res) => {
    const tasks = await getAllTasks()
    if(tasks)
        return res.status(200).json(tasks)
    return res.status(500).json({ message: "Internal Server Error" })
}


export const createTaskController = async (req, res) => {
    const createdTask = await createTask(req.body)

    if(createdTask)
        return res.status(200).json({ insertId: createdTask.insertId })
    return res.status(500).json({ message: "Internal Server Error" })
}


export const deleteTaskController = async (req, res) => {
  const id = req.params.id
  const deletedTask = await deleteTask(id)
    
  if(deletedTask)
    return res.status(200).json({ message: `Tarefa deletada com sucesso` })
  res.status(500).json({ message: "Internal Server Error" })
}


export const updateTaskController = async (req, res) => {
    const { id } = req.params;
    const task = req.body;

    try {
      const updatedTask = await updateTask(id, task);
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

