const Usuario = require('./models');

class UsuarioRepository {
    async insert(dados) { 
        return await Usuario.create(dados);
    }

    async findAll() {
        return await Usuario.findAll();
    }
}

module.exports = new UsuarioRepository();