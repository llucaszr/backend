const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // simula autenticação
  if (username === "jose@iesb.br" && password === "abcd1234") {
    const payload = {
      iss: "Minha API",
      aud: "Você",
      email: username,
      nome: "jose",
    };
    try {
      return res.json({ token: auth.gerarToken(payload) });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  return res.status(401).json({ msg: "Credenciais inválidas" });
});

router.post("/renovar", auth.verificarToken, auth.renovarToken);

module.exports = router;
