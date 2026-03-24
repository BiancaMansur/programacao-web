const { Model, DataTypes } = require('sequelize');

class Endereco extends Model {
  static init(sequelize) {
    super.init({
      logradouro: DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      latitude: DataTypes.DECIMAL(9, 6),
      longitude: DataTypes.DECIMAL(9, 6),
    }, { sequelize, tableName: 'enderecos' });
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }
}

module.exports = Endereco;