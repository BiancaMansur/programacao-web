module.exports = (perfisAutorizados) => {
    return (req, res, next) => {
        // Verifica se o perfil que veio do token está na lista de autorizados
        if (!req.usuarioPerfil || !perfisAutorizados.includes(req.usuarioPerfil)) {
            return res.status(403).json({ 
                erro: "Acesso proibido: seu perfil não tem permissão para esta ação." 
            });
        } 
        next();
    };
};