const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 
const routes = require('./routes/routes'); 
const logger = require('./logger');

const app = express();

app.use(express.json());

// MIDDLEWARE DE LOG DE ACESSO
// Toda vez que alguém acessar qualquer rota, isso roda primeiro.
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
});

/**
 * CONFIGURAÇÃO DO SWAGGER
 * Define o endpoint onde a documentação interativa será exibida.
 * Acesse: http://localhost:3000/api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`Servidor rodando com sucesso em http://localhost:${PORT}`);
    logger.info(`Documentação interativa disponível em http://localhost:${PORT}/api-docs`);
});