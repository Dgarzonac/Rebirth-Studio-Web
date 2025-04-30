const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosControllers');

router.post('/', pagosController.crearPago);
router.get('/', pagosController.obtenerPagos);
router.get('/:id', pagosController.obtenerPagoPorId);
router.put('/:id', pagosController.actualizarPago);
router.delete('/:id', pagosController.eliminarPago);

module.exports = router;
