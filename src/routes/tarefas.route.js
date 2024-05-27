import { Router } from "express";
import TarefasController from "../controllers/tarefas.controller.js";
import {tarefaValidator, tarefaIdValidator} from "../validators/tarefas.validator.js";

const router = Router()

router.get("/", TarefasController.listar)
router.get("/:id",tarefaIdValidator, TarefasController.exibir)
router.post("/", tarefaValidator, TarefasController.inserir)
router.put("/:id", [tarefaIdValidator, tarefaValidator],TarefasController.alterar)
router.delete("/:id",tarefaIdValidator, TarefasController.excluir)

export default router