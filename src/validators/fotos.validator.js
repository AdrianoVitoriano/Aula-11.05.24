import { body, param } from "express-validator";

export const fotoValidator = [
    body('titulo').isString().withMessage('Título da foto é obrigatório'),
    body('url').isString().withMessage('URL da foto é obrigatório'),
    body('idProduto').isInt().withMessage('O ID do Produto é obrigatório'),
]
export const fotoIdValidator =[
    param('id').isInt().withMessage("ID é obrigatório.")
]
