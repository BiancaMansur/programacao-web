const { Model, DataTypes } = require('sequelize');

class Mensagem extends Model {
  static init(sequelize) {
    super.init({
      conteudo: { 
        type: DataTypes.TEXT, 
        allowNull: false 
      },
    }, { 
      sequelize, 
      tableName: 'mensagens',
      underscored: true 
    });
  }

  static associate(models) {
    this.belongsTo(models.Match, { foreignKey: 'match_id', as: 'match' });
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_envio', as: 'remetente' });
  }
}

module.exports = Mensagem;