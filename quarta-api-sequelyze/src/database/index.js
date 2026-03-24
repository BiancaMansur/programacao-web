const Sequelize = require('sequelize');
const config = require('../../knexfile');

// 1. Importação dos Modelos
const Usuario = require('../usuario/models');
const Endereco = require('../endereco/models');
const Foto = require('../foto/models');
const Interacao = require('../interacao/models');
const Interesse = require('../interesse/models');
const Match = require('../match/models');
const Mensagem = require('../mensagem/models');
const UsuarioInteresse = require('../usuarioInteresse/models');

// 2. Extração dos dados (Garante que pegamos do lugar certo)
const dbData = config.development.connection || config.development;

// 3. Configuração centralizada
const dbConfig = {
    username: dbData.user || dbData.username || 'postgres',
    password: dbData.password || '123456', // <-- Verifique se sua senha é essa
    database: dbData.database || 'app_relacionamentos',
    host: dbData.host || 'localhost',
    dialect: 'postgres', // <-- O erro acontece se isso aqui faltar ou estiver errado
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'criado_em', // <--- Força esse nome para todas as tabelas
        updatedAt: 'atualizado_em'
},
    logging: false
};

// 4. Criação da Conexão (Passando o objeto completo como 4º argumento)
const connection = new Sequelize(
    dbConfig.database, 
    dbConfig.username, 
    dbConfig.password, 
    dbConfig // Aqui o Sequelize vai achar o 'dialect'
);

// 5. Inicialização
const models = [
    Usuario, Endereco, Foto, Interacao, 
    Interesse, Match, Mensagem, UsuarioInteresse
];

models.forEach(model => {
    if (model && model.init) model.init(connection);
});

models.forEach(model => {
    if (model && model.associate) model.associate(connection.models);
});

// 6. Exportação para App e CLI
connection.development = dbConfig; 
module.exports = connection;

//usei gpt aqui, aviso logo. Estava travando muito quando mudei de knex para sequelize