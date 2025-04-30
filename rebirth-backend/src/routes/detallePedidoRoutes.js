const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedidoControllers');

// Definir las rutas
router.get('/', detallePedidoController.obtenerDetallesPedido);
router.get('/:id_pedido', detallePedidoController.obtenerDetallePorPedido);
router.post('/', detallePedidoController.agregarDetallePedido);
router.put('/:id_detalle', detallePedidoController.actualizarDetallePedido);
router.delete('/:id_detalle', detallePedidoController.eliminarDetallePedido);

module.exports = router;
