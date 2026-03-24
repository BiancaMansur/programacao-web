const { Model, DataTypes } = require('sequelize');

class Match extends Model {
  static init(sequelize) {
    super.init({
      // No Sequelize, se não houver campos extras, o init pode ser simples
      // As chaves estrangeiras entram no associate
    }, { 
      sequelize, 
      tableName: 'matches',
      underscored: true // Isso faz com que campos como createdAt fiquem created_at
    });
  }

  static associate(models) {
    // Um match pertence a dois usuários
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_1', as: 'user1' });
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_2', as: 'user2' });
    // Um match tem muitas mensagens
    this.hasMany(models.Mensagem, { foreignKey: 'match_id', as: 'mensagens' });
  }
}

module.exports = Match;