const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const usuariosController = require('../controllers/usuariosControllers');
const authorizeRole = require('../middlewares/authorizeRole');

router.get('/me', authMiddleware, usuariosController.getUsuarioActual);
router.post('/registro', usuariosController.addUsuario);
router.post('/login', usuariosController.loginUsuario);


router.get('/', authMiddleware, authorizeRole('admin'), usuariosController.getUsuarios);
router.get('/:id', authMiddleware, authorizeRole('admin'), usuariosController.getUsuarioById);
router.put('/:id', authMiddleware, authorizeRole('admin', 'cliente'), usuariosController.updateUsuario);
router.put('/:id/password', authMiddleware, authorizeRole('admin', 'cliente'), usuariosController.changePassword);
router.delete('/:id', authMiddleware, authorizeRole('admin'), usuariosController.deleteUsuario);

// router.get('/', usuariosController.getUsuarios); // Ahora accesible sin token
// router.get('/:id', usuariosController.getUsuarioById);
// router.put('/:id', usuariosController.updateUsuario);
// router.put('/:id/password', usuariosController.changePassword);
// router.delete('/:id', usuariosController.deleteUsuario);
// router.post('/registro', usuariosController.addUsuario);
// router.post('/login', usuariosController.loginUsuario);

module.exports = router;
