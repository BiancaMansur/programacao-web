const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Curso = sequelize.define('Curso', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false, // Não permite nulo
    },
    cargaHoraria: {
        type: DataTypes.INTEGER,
        allowNull: false // Não permite nulo
    }
}, {
    tableName: 'cursos', // Nome da tabela física no PostgreSQL
    timestamps: false
});

module.exports = Curso;