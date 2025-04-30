const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios (solo para admins)
exports.getUsuarios = async (req, res) => {
    try {
        const [usuarios] = await pool.query('SELECT id_usuario, nombre, email, rol FROM usuarios');
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const [usuario] = await pool.query('SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?', [id]);

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener el usuario autenticado (extraído del token)
exports.getUsuarioActual = async (req, res) => {
    try {
        const id = req.usuario.id; // Este ID lo extrae el middleware desde el token

        const [usuario] = await pool.query(
            'SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?',
            [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Registrar un usuario (hash de contraseña y evitar duplicados)
exports.addUsuario = async (req, res) => {
    try {
        const { id_usuario, nombre, email, contraseña, rol } = req.body;

        // Verificar si el usuario ya existe
        const [existe] = await pool.query('SELECT id_usuario FROM usuarios WHERE email = ?', [email]);
        if (existe.length > 0) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        // Insertar usuario en la base de datos
        const [result] = await pool.query(
            'INSERT INTO usuarios (id_usuario, nombre, email, contraseña, rol) VALUES (?, ?, ?, ?, ?)',
            [id_usuario, nombre, email, hashedPassword, rol || 'cliente']
        );

        res.status(201).json({ id: result.insertId, message: 'Usuario registrado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Iniciar sesión y generar JWT
exports.loginUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        // Buscar usuario por email
        const [usuario] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuario.length === 0) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Comparar contraseña
        const validPassword = await bcrypt.compare(contraseña, usuario[0].contraseña);
        if (!validPassword) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario[0].id_usuario, rol: usuario[0].rol },
            process.env.JWT_SECRET || 'secreto123',
            { expiresIn: '2h' }
        );

        res.json({ token, usuario: { id: usuario[0].id_usuario, nombre: usuario[0].nombre, email: usuario[0].email, rol: usuario[0].rol } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Actualizar usuario (solo nombre y rol, la contraseña se cambia aparte)
exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, rol } = req.body;
        const usuarioLogueado = req.usuario;

        // Verificación de permisos
        if (usuarioLogueado.rol === 'cliente' && usuarioLogueado.id !== id) {
            return res.status(403).json({ message: 'No tienes permiso para modificar este usuario.' });
        }

        if (usuarioLogueado.rol === 'cliente' && rol && rol !== 'cliente') {
            return res.status(403).json({ message: 'No puedes cambiar tu rol.' });
        }        

        const [result] = await pool.query(
            'UPDATE usuarios SET nombre=?, rol=? WHERE id_usuario=?',
            [nombre, rol, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Cambiar contraseña (requiere la contraseña actual)
exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const usuarioLogueado = req.usuario;

        // Verificación de permisos
        if (usuarioLogueado.rol === 'cliente' && usuarioLogueado.id !== id) {
            return res.status(403).json({ message: 'No tienes permiso para cambiar esta contraseña.' });
        }

        // Obtener la contraseña actual
        const [usuario] = await pool.query('SELECT password FROM usuarios WHERE id_usuario = ?', [id]);
        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(oldPassword, usuario[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await pool.query('UPDATE usuarios SET password=? WHERE id_usuario=?', [hashedPassword, id]);

        res.json({ message: 'Contraseña actualizada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Eliminar un usuario (solo admins pueden hacerlo)
exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
