import { Router } from "express";
import UsuariosController from "../controllers/usuarios.controller.js";
import {usuarioValidator, usuarioIdValidator} from "../validators/usuarios.validator.js";

const router = Router()

router.get("/", UsuariosController.listar)
router.get("/:id",usuarioIdValidator, UsuariosController.exibir)
router.post("/", usuarioValidator, UsuariosController.inserir)
router.put("/:id", [usuarioIdValidator, usuarioValidator],UsuariosController.alterar)
router.delete("/:id",usuarioIdValidator, UsuariosController.excluir)

export default router