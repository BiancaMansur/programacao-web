const CursoRepository = require('../repositories/CursoRepository');
const db = require('../database/connection');

class CursoService {
    // Retorna a lista completa de cursos
    async listarTodos() {
        return await CursoRepository.findAll();
    }

    // Valida a existência do curso antes de retornar
    async buscarPorId(id) {
        const curso = await CursoRepository.findById(id);
        if (!curso) {
            throw new Error("Curso não encontrado.");
        }
        return curso;
    }

    // Cria um curso (Agora transacional por padrão)
    async criarCurso(dados) {
        return await db.transaction(async (trx) => {
            try {
                // Validação de dados
                if (!dados.nome || dados.cargaHoraria <= 0) {
                    throw new Error("Dados inválidos: Nome obrigatório e carga horária deve ser positiva.");
                }

                // Executa a criação passando o objeto trx para o repositório
                const novoCurso = await CursoRepository.create(dados, trx);

                // Gatilho de Rollback para teste
                if (dados.cargaHoraria === 1000) {
                    throw new Error("Falha parcial simulada: Carga horária excedida. Rollback executado.");
                }

                return novoCurso;
            } catch (error) {
                // O Knex executa o Rollback automaticamente ao lançar o erro aqui
                console.error("Erro na criação do curso:", error.message);
                throw error;
            }
        });
    }

    // Verifica se o curso existe antes de tentar atualizar (Transacional por padrão)
    async atualizarCurso(id, dados) {
        return await db.transaction(async (trx) => {
            try {
                const cursoExiste = await CursoRepository.findById(id);
                if (!cursoExiste) {
                    throw new Error("Não é possível atualizar: Curso inexistente.");
                }

                // Realiza a atualização usando a transação
                return await CursoRepository.update(id, dados, trx);
            } catch (error) {
                console.error("Erro na atualização do curso:", error.message);
                throw error;
            }
        });
    }

    // Gerencia a exclusão (Transacional por padrão)
    async removerCurso(id) {
        return await db.transaction(async (trx) => {
            try {
                const deletado = await CursoRepository.delete(id, trx);
                if (!deletado) {
                    throw new Error("Curso não encontrado para remoção.");
                }
                return deletado;
            } catch (error) {
                console.error("Erro na remoção do curso:", error.message);
                throw error;
            }
        });
    }
}

module.exports = new CursoService();