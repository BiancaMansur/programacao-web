const { Model, DataTypes } = require('sequelize');

class Interesse extends Model {
  static init(sequelize) {
    super.init({
      descricao: { type: DataTypes.STRING, unique: true },
    }, { sequelize, tableName: 'interesses' });
  }

  static associate(models) {
    this.belongsToMany(models.Usuario, { 
      through: 'usuarios_interesses', 
      foreignKey: 'interesse_id', 
      as: 'usuarios' 
    });
  }
}

module.exports = Interesse;