import { body, param } from "express-validator";

export const usuarioValidator = [
    body('nome').isString().withMessage('Nome é obrigatório'),
    body('cpf').isString().withMessage('CPF é obrigatório'),
    body('cargo').isString().withMessage('Cargo é obrigatório'),
    body('dtNascimento').isString().withMessage('Data Nascimento é obrigatório')
]
export const usuarioIdValidator =[
    param('id').isInt().withMessage("ID é obrigatório.")
]
