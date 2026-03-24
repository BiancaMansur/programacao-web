module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'app_relacionamentos',
      user: 'postgres',
      password: '123456', 
      host: 'localhost',
      port: 5432
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  }
};