const repository = require('./repository');

class FotoService {
    async listarTodas() {
        return await repository.findAll();
    }

    async buscarPorId(id) {
        const foto = await repository.findById(id);
        if (!foto) throw new Error("Foto não encontrada");
        return foto;
    }

    async listarPorUsuario(usuario_id) {
        return await repository.findByUsuario(usuario_id);
    }

    async criar(dados) {
        if (!dados.url) throw new Error("A URL da foto é obrigatória");
        if (!dados.usuario_id) throw new Error("O ID do usuário é obrigatório");
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

module.exports = new FotoService();