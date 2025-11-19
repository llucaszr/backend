const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function verificarToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    return next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  const expiresIn = process.env.JWT_EXPIRES;

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
  } catch (err) {
    throw Error("Erro ao gerar token");
  }
}

function cifrarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);
  return hash;
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}

module.exports = { verificarToken, gerarToken, cifrarSenha, compararSenha };
