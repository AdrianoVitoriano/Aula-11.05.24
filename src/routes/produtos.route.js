import { Router } from "express";
import ProdutosController from "../controllers/produtos.controller.js";
import {produtoValidator, produtoIdValidator} from "../validators/produtos.validator.js";

const router = Router()

router.get("/", ProdutosController.listar)
router.get("/:id",produtoIdValidator, ProdutosController.exibir)
router.post("/", produtoValidator, ProdutosController.inserir)
router.put("/:id", [produtoIdValidator, produtoValidator],ProdutosController.alterar)
router.delete("/:id",produtoIdValidator, ProdutosController.excluir)

export default router