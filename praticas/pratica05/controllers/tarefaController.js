const tarefaModel = require("../model/tarefaModel");

function listar(req, res) {
  let resultado = tarefaModel.listar();
  res.json({ resultado });
}

function buscarPeloId(req, res) {
  let resultado = tarefaModel.buscarPeloId(req.params.tarefaId);
  if (resultado === undefined)
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  res.json({ resultado });
}

function criar(req, res) {
  let resultado = tarefaModel.criar(req.body);
  res.status(201).json({ resultado });
}

function atualizar(req, res) {
  let resultado = tarefaModel.atualizar(req.params.tarefaId, req.body);
  if (resultado === undefined)
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  res.status(200).json({ resultado });
}

function remover(req, res) {
  let resultado = tarefaModel.remover(req.params.tarefaId);
  if (resultado === undefined)
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  res.status(204).send();
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };
