const { Model, DataTypes } = require('sequelize');

class UsuarioInteresse extends Model {
  static init(sequelize) {
    super.init({

    }, { 
      sequelize, 
      tableName: 'usuarios_interesses',
      underscored: true 
    });
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    this.belongsTo(models.Interesse, { foreignKey: 'interesse_id' });
  }
}

module.exports = UsuarioInteresse;