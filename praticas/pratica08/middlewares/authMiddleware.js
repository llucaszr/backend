const jsonWebToken = require('jsonwebtoken');

function verificarToken(req,res,next){
    try{
        const { token } = req.headers;
        if(token){
            const usuario = jsonWebToken.verify(token,process.env.JWT_SECRET);
        } 
        return next();
    }catch(err){
        return res.status(401).json({msg:"Token inválido"});
    }
}

function gerarToken(payload){
    const expiresIn = 120;
    try{
        return jsonWebToken.sign(payload,process.env.JWT_SECRET,{expiresIn})
    }catch(err){
        return res.status(401).json({msg:"Erro ao gerar o token"});
    }
}

module.exports = { gerarToken, verificarToken };