const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/produtos', authMiddleware.verificarToken, (req,res)=>{
    return res.json({});
});

module.exports = router;