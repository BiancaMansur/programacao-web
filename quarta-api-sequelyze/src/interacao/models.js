const { Model, DataTypes } = require('sequelize');

class Interacao extends Model {
  static init(sequelize) {
    super.init({
      curtiu: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'interacoes' });
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_remetente', as: 'remetente' });
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_destinatario', as: 'destinatario' });
  }
}

module.exports = Interacao;