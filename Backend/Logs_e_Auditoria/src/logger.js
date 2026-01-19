const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Nível mínimo de log (info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp(), // Adiciona data/hora
    winston.format.json()       // Salva em formato JSON
  ),
  transports: [
    // 1. Salva erros em arquivo específico
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    
    // 2. Salva TUDO (info, warn, error) em outro arquivo
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Se não estivermos em produção, mostra no console também 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    )
  }));
}

module.exports = logger;