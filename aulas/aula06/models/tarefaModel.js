const tarefas = [];

const listar = () => {
  return tarefas;
};

const criar = (dados) => {
  const novaTarefa = {
    ...dados,
    id: tarefas.length + 1,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

const obter = (id) => {
  const tarefaEcontrada = tarefas.find((item) => item.id === parseInt(id));
  return tarefaEcontrada;
};

const atualizar = (tarefa) => {
  const tarefaEcontrada = tarefas.find((item) => item.id == tarefa.id);
  if (tarefaEcontrada) {
    tarefaEcontrada.nome = tarefa.nome;
    tarefaEcontrada.concluida = tarefa.concluida;
  }
  return tarefaEcontrada;
};

const remover = (id) => {
  const posicao = tarefas.findIndex((item) => item.id == id);
  if (posicao >= 0) {
    tarefas.splice(posicao, 1);
  }
  return posicao;
};

module.exports = { listar, criar, obter, atualizar, remover };
