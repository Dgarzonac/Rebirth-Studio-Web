const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosControllers');

// Rutas para pedidos
router.post('/', pedidosController.crearPedido);
router.get('/', pedidosController.obtenerPedidos);
router.get('/:id', pedidosController.obtenerPedidoPorId);
router.put('/:id', pedidosController.actualizarPedido);
router.delete('/:id', pedidosController.eliminarPedido);

module.exports = router;
