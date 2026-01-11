const CursoRepository = require('../repositories/CursoRepository');
const sequelize = require('../database/connection'); // Importado para gerenciar a transação

class CursoService {
    // Retorna a lista completa de cursos
    async listarTodos() {
        return await CursoRepository.findAll();
    }
    // Valida a existência do curso antes de retornar
    async buscarPorId(id) {
        const curso = await CursoRepository.findById(id);
        if (!curso) throw new Error("Curso não encontrado.");
        return curso;
    }
    // Valida os dados antes da criação no banco (Com Transação)
    async criar(dados) {
        // Inicia o escopo da transação gerenciada
        return await sequelize.transaction(async (t) => {
            if (!dados.nome || !dados.cargaHoraria) {
                throw new Error("Dados inválidos: Nome obrigatório e carga horária deve ser positiva.");
            }
            // Exemplo de Falha Parcial: Se a carga horária for 1000, forçamos o Rollback para demonstrar consistência
            if (dados.cargaHoraria === 1000) {
                throw new Error("Falha simulada: Carga horária excedida. Transação revertida no Sequelize.");
            }

            // Passamos o objeto de transação 't' para o repositório
            return await CursoRepository.create(dados, t);
        });
    }
    // Verifica se o curso existe antes de tentar atualizar (Com Transação)
    async atualizar(id, dados) {
        return await sequelize.transaction(async (t) => {
            // Executa a atualização vinculada à transação 't'
            const atualizado = await CursoRepository.update(id, dados, t);
            if (!atualizado) throw new Error("Curso não encontrado para atualização.");
            return atualizado;
        });
    }
    // Gerencia a exclusão (Com Transação)
    async remover(id) {
        return await sequelize.transaction(async (t) => {
            // Executa a remoção vinculada à transação 't'
            const deletado = await CursoRepository.delete(id, t);
            if (!deletado) throw new Error("Curso não encontrado para remoção.");
            return deletado;
        });
    }
}

module.exports = new CursoService();