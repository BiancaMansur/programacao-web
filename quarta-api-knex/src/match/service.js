const repository = require('./repository');

class MatchService {
    async listarTodos() {
        return await repository.findAll();
    }

    async buscarPorId(id) {
        const match = await repository.findById(id);
        if (!match) throw new Error("Match não encontrado");
        return match;
    }

    async criar(dados) {
        if (!dados.usuario_id_1 || !dados.usuario_id_2) {
            throw new Error("IDs dos utilizadores são obrigatórios");
        }

        const existe = await repository.findByUsuarios(dados.usuario_id_1, dados.usuario_id_2);
        if (existe) throw new Error("Estes utilizadores já possuem um match");

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

module.exports = new MatchService();