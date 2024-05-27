import { body, param } from "express-validator";

export const categoriaValidator = [
    body('nome').isString().withMessage('Nome é obrigatório')
]
export const categoriaIdValidator =[
    param('id').isInt().withMessage("ID é obrigatório.")
]
