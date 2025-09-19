const tarefas = [];

listarTarefas = (req, res) => {
  res.json(tarefas);
};

criarTarefa = (req, res) => {
  // const novaTarefa = {req.body.nome, req.body.concluida }
  const novaTarefa = {
    ...req.body,
    id: tarefas.length + 1,
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
};

buscarId = (req, res) => {
  const { id } = req.params;
  const tarefaEcontrada = tarefas.find((item) => item.id === parseInt(id));
  if (tarefaEcontrada) return res.json(tarefaEcontrada);
  else res.status(404).json({ msg: "Tarefa não encontrada" });
};

atualizarId = (req, res) => {
  const { id } = req.params;
  const tarefaEcontrada = tarefas.find((item) => item.id == id);
  if (tarefaEcontrada) {
    tarefaEcontrada.nome = req.body.nome;
    tarefaEcontrada.concluida = req.body.concluida;
    return res.json(tarefaEcontrada);
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

deletarId = (req, res) => {
  const { id } = req.params;
  const posicao = tarefas.findIndex((item) => item.id == id);
  if (posicao >= 0) {
    tarefas.splice(posicao, 1);
    res.status(204).end();
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

module.exports = {
  listarTarefas,
  criarTarefa,
  buscarId,
  atualizarId,
  deletarId,
};
