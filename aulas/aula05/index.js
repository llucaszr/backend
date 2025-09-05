// Importa o framework
const express = require("express");
// Criar uma instancia da aplicação
const app = express();

// Middleware de aplicação
app.use((req, res, next) => {
  console.log("Passei aqui!");
  next();
});

// Middleware de rota
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Chegou aqui!");
});
router.post("/", (req, res) => {
  res.status(201).send("Inserido com sucesso!");
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id == 1) return res.send("Achei!");
  throw Error("Não achei");
});
app.use("/tarefas", router);

// Middleware de erro
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("Algo de errado não está certo!");
});

// Inicia a aplicação (ele é a ultima parte do código)
app.listen(3000, () => {
  console.log("App está ON! => http://localhost:3000");
});
