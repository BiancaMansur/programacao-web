const UsuarioInteresse = require('./models');

class UsuarioInteresseRepository {
    async findByUsuario(usuario_id) {
        return await UsuarioInteresse.findAll({
            where: { usuario_id },
            include: ['interesse'] 
        });
    }

     async vincular(usuario_id, interesse_id) {
        return await UsuarioInteresse.create({
            usuario_id,
            interesse_id
        });
    }

    async desvincular(usuario_id, interesse_id) {
        return await UsuarioInteresse.destroy({
            where: {
                usuario_id,
                interesse_id
            }
        });
    }
}

module.exports = new UsuarioInteresseRepository();