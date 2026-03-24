const Endereco = require('./models');

class EnderecoRepository {
    async findAll() {
        return await Endereco.findAll({ include: 'usuario' }); 
    }
    async create(dados) {
        return await Endereco.create(dados);
    }
}
module.exports = new EnderecoRepository();