const model = require("../models/tarefaModel");

const listarTarefas = (req, res) => {
  res.json(model.listar());
};

const criarTarefa = (req, res) => {
  const novaTarefa = model.criar(req.body);
  res.status(201).json(novaTarefa);
};

const buscarTarefa = (req, res, next) => {
  const { id } = req.params;
  const tarefaEcontrada = model.obter(id);
  if (tarefaEcontrada) {
    req.tarefa = tarefaEcontrada;
    return next();
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

const obterTarefa = (req, res) => {
  res.json(req.tarefa);
};

const atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const tarefaEcontrada = model.atualizar({ id, ...req.body });
  res.json(tarefaEcontrada);
};

const removerTarefa = (req, res) => {
  const { id } = req.params;
  model.remover(id);
  res.status(204).end();
};

module.exports = {
  listarTarefas,
  criarTarefa,
  buscarTarefa,
  obterTarefa,
  atualizarTarefa,
  removerTarefa,
};
