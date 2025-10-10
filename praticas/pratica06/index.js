const readline = require("readline-sync");
const controlador = require("./controlador.js");

async function main() {
  while (true) {
    console.log("======= Menu principal =======\n");
    console.log("1 - Criar tarefa");
    console.log("2 - Buscar tarefa");
    console.log("3 - Alterar tarefa");
    console.log("4 - Remover tarefa");
    console.log("5 - Sair\n");

    const opcao = readline.question("Entre com sua opcao: ");

    switch (parseInt(opcao)) {
      case 1: {
        const nome = readline.question("Informe o nome da tarefa: ");
        await controlador.adicionarTarefa(nome);
        console.log("\nTarefa criada com sucesso!\n");
        break;
      }
      case 2: {
        const nome = readline.question("Informe o nome da tarefa: ");
        const tarefa = await controlador.buscarTarefa(nome);
        if (tarefa && tarefa.id) {
          console.log("\nTarefa encontrada:");
          console.log(`ID: ${tarefa.id}`);
          console.log(`Nome: ${tarefa.nome}`);
          console.log(`Concluída: ${tarefa.concluida}\n`);
        } else {
          console.log("\nTarefa não encontrada!\n");
        }
        break;
      }
      case 3: {
        const nomeBusca = readline.question("Informe o nome da tarefa: ");
        const nome = readline.question("Informe outro nome para a tarefa: ");
        const concluida = readline.question(
          "Informe outra situacao para tarefa (true/false): "
        );
        await controlador.atualizarTarefa(
          nomeBusca,
          nome,
          concluida === "true"
        );
        console.log("\nTarefa atualizada com sucesso!\n");
        break;
      }
      case 4: {
        const nome = readline.question("Digite o nome do registro: ");
        await controlador.removerTarefa(nome);
        console.log("\nTarefa removida com sucesso!\n");
        break;
      }
      case 5:
        process.exit(0);
    }
  }
}

main();
