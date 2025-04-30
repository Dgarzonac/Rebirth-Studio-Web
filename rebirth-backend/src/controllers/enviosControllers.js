const pool = require('../config/db');

// Crear un nuevo envío
exports.crearEnvio = async (req, res) => {
    try {
        const { id_pedido, direccion_envio, estado_envio } = req.body;

        const result = await pool.query(
            'INSERT INTO envios (id_pedido, direccion_envio, estado_envio) VALUES (?, ?, ?)',
            [id_pedido, direccion_envio, estado_envio]
        );

        res.status(201).json({ message: 'Envío registrado', id_envio: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todos los envíos
exports.obtenerEnvios = async (req, res) => {
    try {
        const [envios] = await pool.query('SELECT * FROM envios');
        res.json(envios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener envío por ID
exports.obtenerEnvioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [envio] = await pool.query('SELECT * FROM envios WHERE id_envio = ?', [id]);

        if (envio.length === 0) {
            return res.status(404).json({ message: 'Envío no encontrado' });
        }

        res.json(envio[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un envío
exports.actualizarEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pedido, direccion_envio, estado_envio } = req.body;

        const result = await pool.query(
            'UPDATE envios SET id_pedido = ?, direccion_envio = ?, estado_envio = ? WHERE id_envio = ?',
            [id_pedido, direccion_envio, estado_envio, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Envío no encontrado' });
        }

        res.json({ message: 'Envío actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un envío
exports.eliminarEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM envios WHERE id_envio = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Envío no encontrado' });
        }

        res.json({ message: 'Envío eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
