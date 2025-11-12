const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', async (req,res)=>{
    const { username } = req.body;
    const payload = {
        email: username,
      };
    return res.status(200).json({ token: authMiddleware.gerarToken(payload) });
})

router.post('/renovar', authMiddleware.verificarToken, (req,res)=>{
    const { username } = req.body;
    const payload = {
        email: username,
      };
    return res.status(200).json({ token: authMiddleware.gerarToken(payload) });
});

module.exports = router;