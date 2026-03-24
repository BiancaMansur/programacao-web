const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.listar);
router.get('/:id', controller.visualizar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;