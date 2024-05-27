import { body, param } from "express-validator";

export const tarefaValidator = [
    body('titulo').isString().withMessage('O Titulo da tarefa é obrigatório'),
    body('descricao').isString().withMessage('A Descrição da tarefa é obrigatório'),
    body('idUsuario').isInt().withMessage('O ID do Usuário é obrigatório'),

]
export const tarefaIdValidator =[
    param('id').isInt().withMessage("ID é obrigatório.")
]
