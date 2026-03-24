const Mensagem = require('./models');

class MensagemRepository {
    async findByMatch(match_id) {
        return await Mensagem.findAll({ 
            where: { match_id },
            order: [['created_at', 'ASC']] 
        });
    }
    async enviar(dados) {
        return await Mensagem.create(dados);
    }
}
module.exports = new MensagemRepository();