import { body, param } from "express-validator";

export const produtoValidator = [
    body('nome').isString().withMessage('Nome do produto é obrigatório'),
    body('preco').isNumeric().withMessage('Preço do produto é obrigatório'),
    body('descricao').isString().withMessage('A Descrição do produto é obrigatório'),
    body('idUsuario').isInt().withMessage('O ID do Usuário é obrigatório'),
    body('idCategoria').isInt().withMessage('O ID da Categoria é obrigatório')
]
export const produtoIdValidator =[
    param('id').isInt().withMessage("ID é obrigatório.")
]