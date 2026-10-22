const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', clienteController.listarClientes);
router.get('/cidade/:cidade', clienteController.listarPorCidade);
router.get('/:id', clienteController.obterClientePorId);
router.get('/:id/pedidos', clienteController.listarPedidos);
router.post('/:id/pedidos', clienteController.adicionarPedido);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.remover);

module.exports = router;