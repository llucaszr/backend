// importa o framework
const express = require("express");

// importa middleware de terceiros
const cors = require("cors");

// importa middleware de rota
const router = require("./routerTarefa");

// Criar uma instancia da aplicação
const app = express();

// Middleware embutido ou integrado
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //?param1=valor1&param2=valor2

// middlware de terceiros
app.use(cors());

// Middleware de aplicação
app.use((req, res, next) => {
  console.log("Passei aqui!");
  next();
});

// middleware de rota
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
