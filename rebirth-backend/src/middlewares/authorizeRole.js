// middlewares/authorizeRole.js
module.exports = function authorizeRole(...allowedRoles) {
    return (req, res, next) => {
      const usuario = req.uusario; // Esto viene del authMiddleware
      if (!usuario || !allowedRoles.includes(usuario.rol)) {
        return res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
      }
      next();
    };
  };
  