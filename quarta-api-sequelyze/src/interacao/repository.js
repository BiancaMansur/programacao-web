const Interacao = require('./models');

class InteracaoRepository {
    async registrar(dados) {
        return await Interacao.create(dados);
    }
}
module.exports = new InteracaoRepository();