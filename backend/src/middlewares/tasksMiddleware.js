import { connection } from "../models/connection.js"


export const validateBodyToCreate = async (req, res, next) => {
    const { title } = req.body

    if(!req.body)
        return res.status(400).json({ message: "Envie o titulo da tarefa" })

    if(!title)
        return res.status(400).json({ message: "O titulo da tarefa é obrigatório" })
    
    next()
}


export const validateId = async (req, res, next) => {

    const id = req.params.id

    if(!id)
        return res.status(400).json({ message: "Insira o id da tarefa que voce deseja deletar" })

    const [rows] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);

    if (rows.length === 0) {
        return res.status(400).json({ message: 'ID não encontrado no banco de dados.'});
    }

    next()
}


export const validateToUpdate = async (req, res, next) => {
    const id = req.params.id;

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Insira os novos dados da tarefa" });
    }

    if (!id) {
        return res.status(400).json({ message: "Insira o id da tarefa que você deseja atualizar" });
    }

    try {
        const [rows] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'ID não encontrado no banco de dados.' });
        }

        next();
    } catch (error) {
        console.error('Erro ao verificar o ID no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };