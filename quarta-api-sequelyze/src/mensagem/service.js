const repository = require('./repository');

class MensagemService {
    async listarTodas() {
        return await repository.findAll();
    }

    async listarPorMatch(match_id) {
        if (!match_id) throw new Error("ID do match é obrigatório");
        return await repository.findByMatch(match_id);
    }

    async buscarPorId(id) {
        const mensagem = await repository.findById(id);
        if (!mensagem) throw new Error("Mensagem não encontrada");
        return mensagem;
    }

    async criar(dados) {
        if (!dados.conteudo || !dados.match_id || !dados.usuario_id_autor) {
            throw new Error("Conteúdo, match_id e autor são obrigatórios");
        }
        return await repository.insert(dados);
    }

    async atualizar(id, dados) {
        await this.buscarPorId(id);
        return await repository.update(id, dados);
    }

    async excluir(id) {
        return await repository.delete(id);
    }
}

module.exports = new MensagemService();