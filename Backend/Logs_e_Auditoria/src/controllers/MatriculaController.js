const MatriculaService = require('../services/MatriculaService');
const logger = require('../logger');

class MatriculaController {
    // Cria matricula
    create(req, res) {
        try {
            const { alunoId, cursoId } = req.body;
            
            logger.info(`Tentativa de matrícula: Aluno ID ${alunoId} no Curso ID ${cursoId}`);

            if (!alunoId || !cursoId) {
                // Log de erro de validação
                logger.warn("Tentativa de matrícula falhou: IDs obrigatórios ausentes.");
                return res.status(400).json({ erro: "alunoId e cursoId são obrigatórios." });
            }
            const novaMatricula = MatriculaService.matricular(alunoId, cursoId);

            logger.info(`Matrícula realizada com sucesso! ID da Matrícula: ${novaMatricula.id}`);
            res.status(201).json(novaMatricula);
        } catch (error) {
            logger.error(`Erro ao realizar matrícula: ${error.message}`);
            res.status(400).json({ erro: error.message });
        }
    }

    // Retorna todas as matriculas
    getAll(req, res) {
        try {
            logger.debug("Listando todas as matrículas...");
            const matriculas = MatriculaService.listarTodas();
            res.status(200).json(matriculas);
        } catch (error) {
            logger.error(`Erro ao listar matrículas: ${error.message}`);
            res.status(500).json({ erro: "Erro ao listar matrículas." });
        }
    }

    // Remove uma matricula
    delete(req, res) {
        try {
            const { id } = req.params;
            logger.info(`Solicitação de cancelamento da matrícula ID: ${id}`);

            MatriculaService.cancelar(id);
            
            logger.info(`Matrícula ID ${id} cancelada com sucesso.`);
            res.status(204).send();
        } catch (error) {
            logger.error(`Erro ao cancelar matrícula ID ${req.params.id}: ${error.message}`);
            res.status(404).json({ erro: error.message });
        }
    }
}

module.exports = new MatriculaController();