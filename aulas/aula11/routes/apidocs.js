const express = require("express");
const YAML = require("yaml");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");

// Carregando o arquivo swagger.yaml
const file = fs.readFileSync("./swagger.yaml", "utf8");

// Valida o formato YAML
const swaggerDoc = YAML.parse(file);

// Cria middlware de rota
const router = express.Router();

// Carrega a aplicação do swagger UI
router.use("/", swaggerUi.serve);

// Renderizando a documentação
router.get("/", swaggerUi.setup(swaggerDoc));

module.exports = router;
