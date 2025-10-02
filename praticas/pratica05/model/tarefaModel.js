const tarefas = [];

function listar() {
  return tarefas;
}

function buscarPeloId(id) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  return tarefas.find((tarefa) => tarefa.id === id);
}

function criar(tarefa) {
  let novaTarefa = {
    id: "1a2b",
    nome: tarefa.nome,
    concluida: tarefa.concluida,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function atualizar(id, tarefa) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  tarefas[index].nome = tarefa.nome;
  tarefas[index].concluida = tarefa.concluida;
  return tarefas[index];
}

function remover(id) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  const [tarefaRemovida] = tarefas.splice(index, 1);
  return tarefaRemovida;
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };
