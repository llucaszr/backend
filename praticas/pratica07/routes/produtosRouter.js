const express = require("express");
const produtosControlador = require("../controllers/produtosControllers");

const router = express.Router();

router.post("/", produtosControlador.criar);

router.get("/", produtosControlador.listar);

router.get("/:id", produtosControlador.buscar, produtosControlador.exibir);

router.put("/:id", produtosControlador.buscar, produtosControlador.atualizar);

router.delete("/:id", produtosControlador.buscar, produtosControlador.deletar);

module.exports = router;
