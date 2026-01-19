const CursoService = require('../services/CursoService');
const logger = require('../logger');

class CursoController {
    
    // Retorna a lista de todos os cursos
    getAll(req, res) {
        logger.debug("Listando todos os cursos...");
        const cursos = CursoService.listarTodos();
        res.status(200).json(cursos);
    }

    // Retorna um curso específico pelo ID
    getById(req, res) {
        const { id } = req.params;
        const curso = CursoService.buscarPorId(id);
        
        if (!curso) {
            logger.warn(`Tentativa de buscar curso inexistente ID: ${id}`);
            return res.status(404).json({ mensagem: "Curso não encontrado" });
        }
        
        logger.debug(`Curso encontrado: ${curso.nome}`);
        res.status(200).json(curso);
    }

    // Cria um curso
    create(req, res) {
        try {
            logger.info(`Tentativa de criação de curso: ${req.body.nome}`);
            
            const novoCurso = CursoService.criarCurso(req.body);
            
            logger.info(`Curso criado com sucesso! ID: ${novoCurso.id}`);
            res.status(201).json(novoCurso);
        } catch (error) {
            logger.error(`Erro ao criar curso: ${error.message}`);
            res.status(400).json({ erro: error.message });
        }
    }

    // Atualiza um curso existente
    update(req, res) {
        try {
            const { id } = req.params;
            logger.info(`Solicitação de atualização do curso ID: ${id}`);

            const cursoAtualizado = CursoService.atualizarCurso(id, req.body);
            
            if (!cursoAtualizado) {
                logger.warn(`Tentativa de atualizar curso inexistente ID: ${id}`);
                return res.status(404).json({ mensagem: "Curso não encontrado para atualizar" });
            }
            
            logger.info(`Curso ID ${id} atualizado com sucesso.`);
            res.status(200).json(cursoAtualizado);
        } catch (error) {
            logger.error(`Erro ao atualizar curso ID ${req.params.id}: ${error.message}`);
            res.status(400).json({ erro: error.message });
        }
    }

    // Remove um curso do sistema
    delete(req, res) {
        try {
            const { id } = req.params;
            logger.info(`Solicitação de remoção do curso ID: ${id}`);

            const excluido = CursoService.removerCurso(id);
            
            if (!excluido) {
                logger.warn(`Tentativa de remover curso inexistente ID: ${id}`);
                return res.status(404).json({ mensagem: "Curso não encontrado" });
            }

            logger.info(`Curso ID ${id} removido com sucesso.`);
            res.status(204).send();
        } catch (error) {
            logger.error(`Erro ao remover curso ID ${req.params.id}: ${error.message}`);
            res.status(404).json({ mensagem: error.message });
        }
    }
}

module.exports = new CursoController();