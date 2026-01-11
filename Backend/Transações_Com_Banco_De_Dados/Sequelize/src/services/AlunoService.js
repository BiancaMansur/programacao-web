const AlunoRepository = require('../repositories/AlunoRepository');
const sequelize = require('../database/connection'); // Importado para gerenciar o ciclo de transação

class AlunoService {
    // Retorna a lista completa de alunos para o Controller
    async listar() {
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
    // Valida se os campos obrigatórios estão presentes antes de criar (Com Transação)
    async criar(dados) {
        // Inicia uma transação gerenciada. O Sequelize fará o COMMIT ou ROLLBACK automaticamente.
        return await sequelize.transaction(async (t) => {
            if (!dados.nome || !dados.email) {
                throw new Error("Nome e e-mail são obrigatórios.");
            }
            // Exemplo de Falha Parcial: Se o nome for "Erro", forçamos o Rollback para demonstrar consistência
            if (dados.nome === "Erro") {
                throw new Error("Falha simulada: Transação abortada no Sequelize.");
            }
            return await AlunoRepository.create(dados, t);
        });
    }
    // Gerencia a atualização dos dados (Com Transação)
    async atualizar(id, dados) {
        return await sequelize.transaction(async (t) => {
            const aluno = await AlunoRepository.update(id, dados, t);
            if (!aluno) throw new Error("Aluno não encontrado para atualização.");
            return aluno;
        });
    }
    // Gerencia a exclusão (Com Transação)
    async remover(id) {
        return await sequelize.transaction(async (t) => {
            const deletado = await AlunoRepository.delete(id, t);
            if (!deletado) throw new Error("Aluno não encontrado para remoção.");
            return deletado;
        });
    }
}

module.exports = new AlunoService();