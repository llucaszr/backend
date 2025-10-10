const ConectarDb = require("./database");

class Tarefa {
  constructor(nome, concluida) {
    this.nome = nome;
    this.concluida = concluida;
    this.id = null;
    this.db = null;
    this.collection = null;
    this.inicializarDb();
  }

  async inicializarDb() {
    try {
      this.db = await ConectarDb();
      this.collection = this.db.collection("tarefas");
    } catch (error) {
      console.error("Erro ao conectar com o banco de dados:", error);
    }
  }

  async inserir() {
    if (!this.db) {
      await this.inicializarDb();
    }

    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });

    this.id = resultado.insertedId;
  }

  async alterar(nome, concluida) {
    if (!this.db) {
      await this.inicializarDb();
    }

    const resultado = await this.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
  }

  async deletar() {
    if (!this.db) {
      await this.inicializarDb();
    }

    const resultado = await this.collection.deleteOne({ nome: this.nome });

    return resultado;
  }

  async buscar() {
    if (!this.db) {
      await this.inicializarDb();
    }

    const resultado = await this.collection.findOne({ nome: this.nome });

    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
    }

    return resultado;
  }
}

const tarefa = new Tarefa("Estudar", false);

module.exports = Tarefa;
