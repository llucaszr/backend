import express from 'express';

//b)
const tarefas = [  
    { id: 1, nome: "Estudar middleware", concluida: false },  
    { id: 2, nome: "Praticar Express", concluida: true }  
  ];

//c)
const app = express();

//a)
const router = express.Router();

//d)
app.use(express.json());

//e)
app.use((req, res, next) => {
    const hora = new Date().toLocaleString('pt-BR');
    const metodo = req.method;
    const url = req.url;
  
    console.log(`[${hora}] ${metodo} ${url}`);
  
    next();
});

//b)
router.get("/tarefas/", (req, res) => {
  res.status(200).json(tarefas)
});

//c)
router.post("/tarefas/", (req, res) => {
  console.log(req.body);
  tarefas.push(req.body);
  res.status(201).send("inserido com sucesso");
});

//d)
router.get("/tarefas/:id", (req, res) => {
    const { id } = req.params;
    for(const tarefa of Object.values(tarefas)) if (id == tarefa["id"]) return res.send("Achei");
    throw Error("Não achei");
});

//e)
router.put("/tarefas/:id", (req,res) => {
    const { id } = req.params;
    for(const tarefa of Object.values(tarefas)) if (id == tarefa["id"])  {
      tarefa.nome = req.body.nome
      tarefa.concluida = req.body.concluida
      return res.send('Atualizado')
    //b
    }throw Error("Não achei");
})

//f)
router.delete("/tarefas/:id", (req,res) => {
  const { id } = req.params;
  for(const tarefa of Object.values(tarefas)) if (id == tarefa["id"])  {
    tarefas.splice(tarefas.indexOf(tarefa),1)
    console.log(tarefas)
    return res.status(204).send('Removido')
  //c
  }throw Error("Não achei");
})

app.use("/",router)

//f)
app.listen(3000, () => {
    console.log("Servidor rodando na porta => http://localhost:3000");
});

//e
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Deu ruim!");
});

//g)
export default app;