const repository = require('./repository');

class EnderecoService {
    async listarTodos() {
        return await repository.findAll();
    }

    async buscarPorId(id) {
        const endereco = await repository.findById(id);
        if (!endereco) throw new Error("Endereço não encontrado");
        return endereco;
    }

    async criar(dados) {
        if (!dados.usuario_id) throw new Error("ID do usuário é obrigatório");
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

module.exports = new EnderecoService();