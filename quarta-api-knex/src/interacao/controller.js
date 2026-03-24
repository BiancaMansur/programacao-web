const service = require('./service');

class InteracaoController {
    async listar(req, res) {
        try {
            const interacoes = await service.listarTodas();
            return res.status(200).json(interacoes);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async visualizar(req, res) {
        try {
            const interacao = await service.buscarPorId(req.params.id);
            return res.status(200).json(interacao);
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
            return res.status(200).send({ mensagem: "Interação removida" });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = new InteracaoController();