const { Model, DataTypes } = require('sequelize');

class Foto extends Model {
  static init(sequelize) {
    super.init({
      url: { type: DataTypes.STRING, allowNull: false },
      foto_perfil: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, { sequelize, tableName: 'fotos' });
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }
}

module.exports = Foto;