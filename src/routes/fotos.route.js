import { Router } from "express";
import FotosController from "../controllers/fotos.controller.js";
import {fotoValidator, fotoIdValidator} from "../validators/fotos.validator.js";

const router = Router()

router.get("/", FotosController.listar)
router.get("/:id",fotoIdValidator, FotosController.exibir)
router.post("/", fotoValidator, FotosController.inserir)
router.put("/:id", [fotoIdValidator, fotoValidator],FotosController.alterar)
router.delete("/:id",fotoIdValidator, FotosController.excluir)

export default router