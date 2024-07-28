import { connection } from "./connection.js"

export const getAllTasks = async () => {
    try {
        const [tasks] = await connection.execute('SELECT * FROM tasks')
        return tasks
    } catch (error) {
        console.log(error)
        return false
    }
}


export const createTask = async (task) => {
    const { title } = task
    const actualDataTime = new Date(Date.now()).toUTCString()
    const data = [title, 'pendente', actualDataTime]

    try {
        const [createdTask] = await connection.execute('INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)', data)
        return createdTask
    } catch (error) {
        console.log(error)
        return false
    }

}


export const deleteTask = async (id) => {
    try {
        const [deletedTask] = await connection.execute('DELETE FROM tasks WHERE id=?', [id])
        return deletedTask
    } catch (error) {
        console.log(error)
        return false
    }
}


export const updateTask = async (id, task) => {
    try {
        const query = 'UPDATE tasks SET title=?, status=? WHERE id=?';
        const { title, status } = task;
        const data = [title, status, id];
        
        const [updateResult] = await connection.execute(query, data);
        if (updateResult.affectedRows === 0)
            return null;

        const [updatedTask] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        return updatedTask[0];
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar a tarefa');
    }
};