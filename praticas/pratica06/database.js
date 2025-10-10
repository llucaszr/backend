const { MongoClient } = require("mongodb");
const url = "mongodb+srv://lfabricio:abcd1234@pratica.7ltvcxv.mongodb.net/";
const client = new MongoClient(url);

async function ConectarDb() {
  try {
    await client.connect();
    return client.db("agenda");
  } catch (e) {
    console.log(`Erro ao conectar com MongoDB! ${e.message}`);
  }
}

module.exports = ConectarDb;
