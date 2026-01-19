require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 
const routes = require('./routes/routes'); 
const app = express();

app.use(express.json());

app.get('/config-info', (req, res) => {
    res.json({
        ambiente: process.env.NODE_ENV,
        banco: process.env.DB_HOST,
        usuario_banco: process.env.DB_USER
    });
});

/**
 * CONFIGURAÇÃO DO SWAGGER
 * Define o endpoint onde a documentação interativa será exibida.
 * Acesse: http://localhost:3000/api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

// Tenta pegar a porta do .env. Se não existir, usa 3000 como padrão.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // Mostra qual ambiente está rodando (development, production, etc)
    console.log(`Ambiente: ${process.env.NODE_ENV}`); 
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Docs: http://localhost:${PORT}/api-docs`);
});