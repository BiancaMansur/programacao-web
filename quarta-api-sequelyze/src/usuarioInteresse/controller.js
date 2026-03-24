const service = require('./service');

class UsuarioInteresseController {
    async listar(req, res) {
        try {
            const { usuario_id } = req.query;
            const dados = usuario_id 
                ? await service.listarPorUsuario(usuario_id)
                : await service.listarTodos();
            return res.status(200).json(dados);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async visualizar(req, res) {
        try {
            const registro = await service.buscarPorId(req.params.id);
            return res.status(200).json(registro);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    async criar(req, res) {
        try {
            await service.criar(req.body);
            return res.status(201).send();
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            await service.atualizar(req.params.id, req.body);
            return res.status(200).send();
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        try {
            await service.excluir(req.params.id);
            return res.status(200).send({ mensagem: "Interesse do usuário removido" });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = new UsuarioInteresseController();