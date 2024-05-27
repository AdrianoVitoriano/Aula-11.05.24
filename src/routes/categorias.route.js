import { Router } from "express";
import CategoriasController from "../controllers/categorias.controller.js";
import {categoriaValidator, categoriaIdValidator} from "../validators/categorias.validator.js";

const router = Router()

router.get("/", CategoriasController.listar)
router.get("/:id",categoriaIdValidator, CategoriasController.exibir)
router.post("/", categoriaValidator, CategoriasController.inserir)
router.put("/:id", [categoriaIdValidator, categoriaValidator],CategoriasController.alterar)
router.delete("/:id",categoriaIdValidator, CategoriasController.excluir)

export default router