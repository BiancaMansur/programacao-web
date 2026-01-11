const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Aluno = sequelize.define('Aluno', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false // Não permite nulo
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Garante que não existam dois alunos com o mesmo e-mail
    }
}, {
    tableName: 'alunos', // Nome da tabela física no PostgreSQL
    timestamps: false
});

module.exports = Aluno;