const Matricula = require('../models/Matricula');

class MatriculaRepository {
    // Retorna todas as matrículas
    async findAll() {
        return await Matricula.findAll({ include: ['aluno', 'curso'] });
    }
    // Busca matriculas um aluno pelo ID
    async findByAlunoId(aluno_id) {
        return await Matricula.findAll({ 
            where: { aluno_id },
            include: ['aluno', 'curso']
        });
    }
    // Busca se já existe o par Aluno/Curso (Agora aceita transação para leitura consistente)
    async findPair(aluno_id, curso_id, t = null) {
        return await Matricula.findOne({ 
            where: { aluno_id, curso_id },
            transaction: t 
        });
    }
    // Cria uma matricula (Agora vinculado à transação t)
    async create(aluno_id, curso_id, t = null) {
        return await Matricula.create(
            { aluno_id, curso_id }, 
            { transaction: t }
        );
    }
    // Remove uma matricula (Agora vinculado à transação t)
    async delete(id, t = null) {
        return await Matricula.destroy({ 
            where: { id },
            transaction: t 
        });
    }
}

module.exports = new MatriculaRepository();