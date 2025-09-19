const express = require("express");
const controller = require("../controllers/tarefasController");

const router = express.Router();

router.get("/", controller.listarTarefas);
router.post("/", controller.criarTarefa);
router.get("/:id", controller.buscarId);
router.put("/:id", controller.atualizarId);
router.delete("/:id", controller.deletarId);

module.exports = router;
