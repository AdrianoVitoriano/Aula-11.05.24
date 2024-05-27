import { Router } from "express";
import produtosRouter from "./produtos.route.js";
import usuariosRouter from "./usuarios.route.js";
import tarefasRouter from "./tarefas.route.js";
import fotosRouter from "./fotos.route.js";
import categoriasRouter from "./categorias.route.js";

const router = Router();

router.use("/usuarios", usuariosRouter);
router.use("/categorias", categoriasRouter);
router.use("/produtos", produtosRouter);
router.use("/tarefas", tarefasRouter);
router.use("/fotos", fotosRouter);

export default router;