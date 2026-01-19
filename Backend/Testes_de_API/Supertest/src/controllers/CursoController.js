const CursoService = require('../services/CursoService');

class CursoController {
    // Retorna a lista de todos os cursos
    getAll(req, res) {
        const cursos = CursoService.listarTodos();
        res.status(200).json(cursos);
    }
    // Retorna um curso específico pelo ID
    getById(req, res) {
        const { id } = req.params;
        const curso = CursoService.buscarPorId(id);
        if (!curso) {
            return res.status(404).json({ mensagem: "Curso não encontrado" });
        }
        res.status(200).json(curso);
    }
    // Cria um curso
    create(req, res) {
        try {
            const novoCurso = CursoService.criarCurso(req.body);
            res.status(201).json(novoCurso);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }
    // Atualiza um curso existente
    update(req, res) {
        try {
            const { id } = req.params;
            const cursoAtualizado = CursoService.atualizarCurso(id, req.body);
            if (!cursoAtualizado) {
                return res.status(404).json({ mensagem: "Curso não encontrado para atualizar" });
            }
            res.status(200).json(cursoAtualizado);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }
    // Remove um curso do sistema
    delete(req, res) {
        try {
            const { id } = req.params;
            
            // Tenta remover
            const sucesso = CursoService.removerCurso(id);
            
            // Se o service retornar false (não achou), devolvemos 404
            if (!sucesso) {
                return res.status(404).json({ error: "Curso não encontrado." });
            }

            // Se deu certo, 204
            res.status(204).send();
        } catch (error) {
            // Se o service lançar um erro crítico, capturamos aqui
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new CursoController();