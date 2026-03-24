const express = require('express');
const router = express.Router();

const usuarioRouter = require('./usuario/router');
const enderecoRouter = require('./endereco/router');
const fotoRouter = require('./foto/router');
const interacaoRouter = require('./interacao/router');
const interesseRouter = require('./interesse/router');
const matchRouter = require('./match/router');
const mensagemRouter = require('./mensagem/router');
const usuarioInteresseRouter = require('./usuarioInteresse/router');

router.use('/usuarios', usuarioRouter);
router.use('/enderecos', enderecoRouter);
router.use('/fotos', fotoRouter);
router.use('/interacoes', interacaoRouter);
router.use('/interesses', interesseRouter);
router.use('/matches', matchRouter);
router.use('/mensagens', mensagemRouter);
router.use('/usuarios-interesses', usuarioInteresseRouter);

module.exports = router;