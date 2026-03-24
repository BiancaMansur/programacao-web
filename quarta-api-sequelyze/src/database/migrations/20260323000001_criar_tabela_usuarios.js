up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      nome: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      senha: { type: Sequelize.STRING(255), allowNull: false },
      data_nascimento: { type: Sequelize.DATE, allowNull: false },
      genero: { type: Sequelize.STRING(20) },
      bio: { type: Sequelize.STRING(300) },
      criado_em: { type: Sequelize.DATE, allowNull: false },
      atualizado_em: { type: Sequelize.DATE, allowNull: false }
    });
  }