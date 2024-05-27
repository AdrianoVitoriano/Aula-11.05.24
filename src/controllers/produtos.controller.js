import Produtos from "../models/produtos.model.js";
import { Result, param, validationResult } from "express-validator";

export default class ProdutosController {
	static async listar(req, res) {
		res.json(await Produtos.findMany());
	}
	static async exibir(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const produto = await buscarPorID(req.params.id);
		if (!produto.encontrado) {
			return res.status(404).json(produto.message);
		}
		res.json(produto.produto);
	}
	static async inserir(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.json(await Produtos.create({ data: req.body }));
	}
	static async alterar(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const produto = await buscarPorID(req.params.id);
		if (!produto.encontrado) {
			return res.status(404).json(produto.message);
		}
		res.json(await Produtos.update({ where: { id: parseInt(req.params.id) }, data: req.body }));
	}
	static async excluir(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const produto = await buscarPorID(req.params.id);
		if (!produto.encontrado) {
			return res.status(404).json(produto.message);
		}
		await Produtos.delete({ where: { id: parseInt(req.params.id) } });
		res.json({ message: "Usuário excluído com sucesso." });
	}
}

async function buscarPorID(id) {
	const produto = await Produtos.findUnique({
		where: { id: parseInt(id) },
		include: {
			fotos: true,
		},
	});
	if (!produto) {
		return { encontrado: false, message: "Produtos não encontrado" };
	}
	return { encontrado: true, produto: produto };
}
