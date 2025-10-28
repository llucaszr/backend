const mongoose = require("mongoose");
const Produto = require("../models/produtosModel.js");

async function criar(req, res) {
  try {
    const novoProduto = await Produto.create({
      nome: req.body.nome,
      preco: req.body.preco,
    });
    return res.status(201).json(novoProduto);
  } catch (err) {
    return res
      .status(422)
      .json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function listar(req, res) {
  produtosCadastrados = await Produto.find({});
  return res.status(200).json(produtosCadastrados);
}

async function buscar(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ msg: "Parâmetro inválido" });

  produtoEncontrado = await Produto.findOne({ _id: id });

  if (produtoEncontrado) {
    req.produto = produtoEncontrado;
    return next();
  } else {
    return res.status(404).json({ msg: "Produto não encontrado" });
  }
}

async function exibir(req, res) {
  return res.status(200).json(req.produto);
}

async function atualizar(req, res) {
  const { id } = req.params;
  try {
    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: id },
      { nome: req.body.nome, preco: req.body.preco },
      { runValidators: true, new: true }
    );
    return res.status(200).json(produtoAtualizado);
  } catch (err) {
    return res
      .status(422)
      .json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function deletar(req, res) {
  const { id } = req.params;
  const produtoRemovido = await Produto.findOneAndDelete({
    _id: id,
  });
  return res.status(204).json({});
}

module.exports = { criar, listar, buscar, exibir, atualizar, deletar };
