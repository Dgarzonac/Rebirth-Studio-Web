const express = require('express');
const router = express.Router();
const enviosController = require('../controllers/enviosControllers');

router.post('/', enviosController.crearEnvio);
router.get('/', enviosController.obtenerEnvios);
router.get('/:id', enviosController.obtenerEnvioPorId);
router.put('/:id', enviosController.actualizarEnvio);
router.delete('/:id', enviosController.eliminarEnvio);

module.exports = router;
