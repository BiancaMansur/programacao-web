const jwt = require('jsonwebtoken');
const SECRET = 'sua_chave_secreta_aqui'; // Use a mesma chave no Login e no Middleware

module.exports = (req, res, next) => {
    //Busca o token no cabeçalho Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }
    //O formato padrão é "Bearer TOKEN", vamos extrair apenas o código
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ erro: "Erro no formato do token" });
    }
    const [scheme, token] = parts;
    //Valida se o Token é verdadeiro e não expirou
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ erro: "Token inválido ou expirado" });
        }
        //Salva os dados do usuário dentro da requisição para uso futuro
        req.usuarioId = decoded.id;
        //Autoriza a continuação para o Controller
        next();
    });
};