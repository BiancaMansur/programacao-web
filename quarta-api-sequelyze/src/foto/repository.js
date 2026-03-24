const Foto = require('./models');

class FotoRepository {
    async findByUsuario(usuario_id) {
        return await Foto.findAll({ where: { usuario_id } });
    }
    async create(dados) {
        return await Foto.create(dados);
    }
}
module.exports = new FotoRepository();