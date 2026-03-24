const service = require('./service');

class MatchController {
    async listar(req, res) {
        try {
            const matches = await service.listarTodos();
            return res.status(200).json(matches);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async visualizar(req, res) {
        try {
            const match = await service.buscarPorId(req.params.id);
            return res.status(200).json(match);
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
            return res.status(200).send({ mensagem: "Match removido" });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = new MatchController();