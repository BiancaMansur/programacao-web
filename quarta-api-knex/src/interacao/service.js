const repository = require('./repository');

class InteracaoService {
    async listarTodas() {
        return await repository.findAll();
    }

    async buscarPorId(id) {
        const interacao = await repository.findById(id);
        if (!interacao) throw new Error("Interação não encontrada");
        return interacao;
    }

    async criar(dados) {
        if (!dados.usuario_id_origem || !dados.usuario_id_destino) {
            throw new Error("IDs de origem e destino são obrigatórios");
        }
        
        if (dados.usuario_id_origem === dados.usuario_id_destino) {
            throw new Error("Um usuário não pode interagir consigo mesmo");
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

module.exports = new InteracaoService();