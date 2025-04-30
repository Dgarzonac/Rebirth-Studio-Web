const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasControllers');

// Definir las rutas
router.get('/', categoriasController.obtenerCategorias);
router.get('/:id', categoriasController.obtenerCategoriaPorId);
router.post('/', categoriasController.agregarCategoria);
router.put('/:id', categoriasController.actualizarCategoria);
router.delete('/:id', categoriasController.eliminarCategoria);

module.exports = router;
