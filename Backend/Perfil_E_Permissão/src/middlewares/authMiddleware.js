const jwt = require('jsonwebtoken');
const SECRET = 'sua_chave_secreta_aqui';

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ erro: "Erro no formato do token" });
    }
    const [scheme, token] = parts;
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ erro: "Token inválido ou expirado" });
        }
        // SALVAMOS O ID E O PERFIL QUE VEM DO TOKEN
        req.usuarioId = decoded.id;
        req.usuarioPerfil = decoded.perfil; // Ex: 'admin' ou 'aluno'
        
        next();
    });
};