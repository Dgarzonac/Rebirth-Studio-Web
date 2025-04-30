const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.header('Authorization'); // Buscar en el header estándar
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Remover "Bearer "
    } else {
        token = req.query.token || req.cookies.token; // Buscar en query params o cookies
    }

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
        req.usuario = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado, por favor inicia sesión nuevamente' });
        } else {
            return res.status(400).json({ message: 'Token no válido' });
        }
    }
};
