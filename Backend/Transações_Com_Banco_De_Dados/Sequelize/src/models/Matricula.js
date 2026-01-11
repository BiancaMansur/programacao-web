const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Aluno = require('./Aluno');
const Curso = require('./Curso');

const Matricula = sequelize.define('Matricula', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,    // Define explicitamente como chave primária
        autoIncrement: true  // Incrementa o valor automaticamente a cada novo registro
    },
}, {
    tableName: 'matriculas',
    timestamps: false
});
Matricula.belongsTo(Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
Matricula.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });

module.exports = Matricula;