const repository = require('./repository');

class InteresseService {
    async listarTodos() {
        return await repository.findAll();
    }

    async buscarPorId(id) {
        const interesse = await repository.findById(id);
        if (!interesse) throw new Error("Interesse não encontrado");
        return interesse;
    }

    async criar(dados) {
        if (!dados.usuario_id || !dados.usuario_id_interessado) {
            throw new Error("IDs dos usuários são obrigatórios");
        }

        const existe = await repository.findByUsuarios(dados.usuario_id, dados.usuario_id_interessado);
        if (existe) throw new Error("Interesse já registrado");

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

module.exports = new InteresseService();