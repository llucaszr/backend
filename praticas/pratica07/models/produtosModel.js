const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome e preço do produto são obrigatórios"],
    minLength: 3,
    trim: true,
  },
  preco: {
    type: Number,
    required: [true, "Nome e preço do produto são obrigatórios"],
    trim: true,
  },
});

module.exports = mongoose.model("Produto", schema);
