const AlunoRepository = require('../repositories/AlunoRepository');
const db = require('../database/connection');

class AlunoService {
    // Retorna a lista completa de alunos para o Controller
    async listarTodos() {
        return await AlunoRepository.findAll();
    }

    // Busca um aluno e pode lançar um erro caso ele não exista
    async buscarPorId(id) {
        const aluno = await AlunoRepository.findById(id);
        if (!aluno) {
            throw new Error("Aluno não encontrado no sistema.");
        }
        return aluno;
    }

    // Cria um aluno (Agora transacional por padrão)
    async criarAluno(dados) {
        // Iniciamos a transação diretamente no método principal
        return await db.transaction(async (trx) => {
            try {
                // Validação de dados obrigatórios
                if (!dados.nome || !dados.email) {
                    throw new Error("Nome e Email são campos obrigatórios.");
                }

                // Criar o aluno passando o objeto de transação (trx)
                const novoAluno = await AlunoRepository.create(dados, trx);

                // Gatilho de Rollback para teste
                if (dados.nome === "Erro") {
                    throw new Error("Falha simulada: Operação cancelada e dados desfeitos.");
                }

                return novoAluno;
            } catch (error) {
                // O Knex desfaz as alterações automaticamente se um erro for lançado
                console.error("Erro na criação do aluno:", error.message);
                throw error;
            }
        });
    }

    // Gerencia a atualização dos dados (Transacional por padrão)
    async atualizarAluno(id, dados) {
        return await db.transaction(async (trx) => {
            try {
                const alunoExiste = await AlunoRepository.findById(id);
                if (!alunoExiste) {
                    throw new Error("Não é possível atualizar: Aluno inexistente.");
                }

                // Chamaremos o método transacional no repositório
                return await AlunoRepository.update(id, dados, trx);
            } catch (error) {
                console.error("Erro na atualização do aluno:", error.message);
                throw error;
            }
        });
    }

    // Gerencia a exclusão (Transacional por padrão)
    async removerAluno(id) {
        return await db.transaction(async (trx) => {
            try {
                // Verificamos a existência antes de deletar dentro da transação
                const deletado = await AlunoRepository.delete(id, trx);
                if (!deletado) {
                    throw new Error("Aluno não encontrado para remoção.");
                }
                return deletado;
            } catch (error) {
                console.error("Erro na remoção do aluno:", error.message);
                throw error;
            }
        });
    }
}

module.exports = new AlunoService();