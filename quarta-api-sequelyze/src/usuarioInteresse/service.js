const repository = require('./repository');

class UsuarioInteresseService {
    async listarTodos() {
        return await repository.findAll();
    }

    async listarPorUsuario(usuario_id) {
        return await repository.findByUsuario(usuario_id);
    }

    async buscarPorId(id) {
        const registro = await repository.findById(id);
        if (!registro) throw new Error("Registro de interesse não encontrado");
        return registro;
    }

    async criar(dados) {
        if (!dados.usuario_id || !dados.interesse_id) {
            throw new Error("Usuário e Interesse são obrigatórios");
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

module.exports = new UsuarioInteresseService();