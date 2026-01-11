const Curso = require('../models/Curso');

class CursoRepository {
    // Lista todos os cursos
    async findAll() {
        return await Curso.findAll();
    }
    // Busca um curso por ID
    async findById(id) {
        return await Curso.findByPk(id);
    }
    // Cria um curso (Agora aceita transação opcional)
    async create(dados, t = null) {
        return await Curso.create(dados, { transaction: t });
    }
    // Atualiza um curso (Agora aceita transação opcional)
    async update(id, dados, t = null) {
        const curso = await Curso.findByPk(id, { transaction: t });
        if (curso) {
            return await curso.update(dados, { transaction: t });
        }
        return null;
    }
    // Remove um curso (Agora aceita transação opcional)
    async delete(id, t = null) {
        return await Curso.destroy({ 
            where: { id },
            transaction: t 
        });
    }
}

module.exports = new CursoRepository();