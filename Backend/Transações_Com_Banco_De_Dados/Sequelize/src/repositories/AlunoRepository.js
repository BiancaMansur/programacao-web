const Aluno = require('../models/Aluno');

class AlunoRepository {
    // Lista todos os alunos
    async findAll() {
        return await Aluno.findAll();
    }
    // Busca um aluno pelo ID.
    async findById(id) {
        return await Aluno.findByPk(id);
    }
    // Cria um aluno (Agora aceita transação opcional)
    async create(dados, t = null) {s
        return await Aluno.create(dados, { transaction: t });
    }
    // Atualiza um aluno (Agora aceita transação opcional)
    async update(id, dados, t = null) {
        // Buscamos o aluno dentro da transação para garantir consistência
        const aluno = await Aluno.findByPk(id, { transaction: t });
        if (aluno) {
            return await aluno.update(dados, { transaction: t });
        }
        return null;
    }
    // Remove um aluno (Agora aceita transação opcional)
    async delete(id, t = null) {
        return await Aluno.destroy({ 
            where: { id },
            transaction: t 
        });
    }
}

module.exports = new AlunoRepository();