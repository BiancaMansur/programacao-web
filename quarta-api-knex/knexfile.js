module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "1234",
      database: "app_relacionamento"
    },
    migrations: {
      directory: "./src/database/migrations"
    }
  }
};