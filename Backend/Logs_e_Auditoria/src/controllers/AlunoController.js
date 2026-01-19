const AlunoService = require('../services/AlunoService');
const logger = require('../logger');

class AlunoController {
    // Lista todos os alunos
    getAll(req, res) {
        // Log informativo simples
        logger.debug("Listando todos os alunos...");
        const alunos = AlunoService.listarTodos();
        res.status(200).json(alunos);
    }

    // Cria um novo aluno
    create(req, res) {
        try {
            // Auditoria: Registra os dados que estão chegando
            logger.info(`Tentativa de cadastro de aluno: ${req.body.nome} (${req.body.email})`);
            const novoAluno = AlunoService.criarAluno(req.body);
            // Sucesso
            logger.info(`Aluno criado com sucesso! ID: ${novoAluno.id}`);
            res.status(201).json(novoAluno);
        } catch (error) {
            // Erro: Vai para o error.log
            logger.error(`Falha ao criar aluno: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    // Busca um aluno específico pelo ID
    getById(req, res) {
        const { id } = req.params;
        const aluno = AlunoService.buscarPorId(id);
        
        if (!aluno) {
            logger.warn(`Busca por aluno inexistente ID: ${id}`);
            return res.status(404).json({ error: "Aluno não encontrado." });
        }
        
        logger.debug(`Aluno encontrado: ID ${id}`);
        res.status(200).json(aluno);
    }

    // Atualiza os dados de um aluno
    update(req, res) {
        try {
            const { id } = req.params;
            logger.info(`Solicitação de atualização para o aluno ID: ${id}`);

            const alunoAtualizado = AlunoService.atualizarAluno(id, req.body);
            
            if (!alunoAtualizado) {
                 logger.warn(`Tentativa de atualizar aluno inexistente ID: ${id}`);
                 return res.status(404).json({ error: "Aluno não encontrado." });
            }

            logger.info(`Aluno ID ${id} atualizado com sucesso.`);
            res.status(200).json(alunoAtualizado);
        } catch (error) {
            logger.error(`Erro ao atualizar aluno ID ${req.params.id}: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    // Remove um aluno do sistema
    delete(req, res) {
        try {
            const { id } = req.params;
            logger.info(`Solicitação de remoção do aluno ID: ${id}`);

            const result = AlunoService.removerAluno(id);
            // Verifica se deletou mesmo
            if (!result) {
                logger.warn(`Tentativa de deletar aluno inexistente ID: ${id}`);
                return res.status(404).json({ error: "Aluno não encontrado." });
            }
            logger.info(`Aluno ID ${id} removido do sistema.`);
            res.status(204).send();
        } catch (error) {
            logger.error(`Erro ao deletar aluno ID ${req.params.id}: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AlunoController();