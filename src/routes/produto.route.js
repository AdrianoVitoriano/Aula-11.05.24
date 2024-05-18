import { Router } from "express";
import ProdutoController from "../controllers/produto.controller.js";
import {produtoValidator, produtoIdValidator} from "../validators/produto.validator.js";

const router = Router()

router.get("/", ProdutoController.listar)
router.get("/:id",produtoIdValidator, ProdutoController.exibir)
router.post("/", produtoValidator, ProdutoController.inserir)
router.put("/:id", [produtoIdValidator, produtoValidator],ProdutoController.alterar)
router.delete("/:id",produtoIdValidator, ProdutoController.excluir)

export default router