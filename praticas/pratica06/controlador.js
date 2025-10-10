const Tarefa = require("./modelo.js");

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);

  await tarefa.inicializarDb();
  await tarefa.inserir();

  return tarefa;
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);

  await tarefa.inicializarDb();
  await tarefa.buscar();

  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome, concluida);

  await tarefa.inicializarDb();
  const tarefaEncontrada = await tarefa.buscar();

  if (tarefaEncontrada) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;

    await tarefa.alterar(nome, concluida);
  }

  return tarefa;
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome, false);

  await tarefa.inicializarDb();
  const tarefaEncontrada = await tarefa.buscar();

  if (tarefaEncontrada) {
    await tarefa.deletar();
  }

  return tarefa;
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa,
};
