const MatriculaService = require('../services/MatriculaService');

class MatriculaController {
    // Lista as matriculas de um aluno pelo ID
    async getByAluno(req, res) {
        try {
            const { id_aluno } = req.params;
            const matriculas = await MatriculaService.listarPorAluno(id_aluno);
            res.status(200).json(matriculas);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }
    // Cria uma matricula (Operação agora transacional no Service)
    async create(req, res) {
        try {
            const { alunoId, cursoId } = req.body;
            // O Service agora garante que a matrícula só ocorra se todas as regras forem atendidas
            const novaMatricula = await MatriculaService.matricular(alunoId, cursoId);
            res.status(201).json(novaMatricula);
        } catch (error) {
            // Caso ocorra Rollback por erro de duplicidade ou falha no banco, cai aqui
            res.status(400).json({ erro: error.message });
        }
    }
    // Lista todas as matriculas
    async getAll(req, res) {
        const dados = await MatriculaService.listarTodas();
        res.status(200).json(dados);
    }
    // Remove uma Matrícula (Operação agora transacional no Service)
    async delete(req, res) {
        try {
            await MatriculaService.cancelar(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }
}

module.exports = new MatriculaController();