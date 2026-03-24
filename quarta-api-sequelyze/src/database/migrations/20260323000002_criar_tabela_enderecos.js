'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('enderecos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }, // Relacionamento aqui
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      logradouro: { type: Sequelize.STRING, allowNull: false },
      latitude: { type: Sequelize.DECIMAL(9, 6) },
      longitude: { type: Sequelize.DECIMAL(9, 6) },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('enderecos');
  }
};