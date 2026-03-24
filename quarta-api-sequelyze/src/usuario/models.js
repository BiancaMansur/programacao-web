const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init({
        nome: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        senha: { type: DataTypes.STRING, allowNull: false },
        data_nascimento: { type: DataTypes.DATEONLY },
        genero: { type: DataTypes.STRING },
        bio: { type: DataTypes.STRING },
    }, 
    { 
        sequelize, 
        tableName: 'usuarios',
        underscored: true,
        createdAt: 'criado_em',   
        updatedAt: 'atualizado_em'
    }
    
    );
  }

  static associate(models) {
    this.hasMany(models.Endereco, { foreignKey: 'usuario_id', as: 'enderecos' });
    this.hasMany(models.Foto, { foreignKey: 'usuario_id', as: 'fotos' });
  }
}

module.exports = Usuario;