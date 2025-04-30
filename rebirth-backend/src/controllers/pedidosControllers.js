const pool = require('../config/db'); // Conexión a la BD

// 📌 Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
    try {
        const { id_usuario, total, estado } = req.body;
        const fecha_pedido = new Date(); // Fecha actual

        // Insertar el pedido en la base de datos
        const [result] = await pool.query(
            'INSERT INTO pedidos (id_usuario, fecha_pedido, total, estado) VALUES (?, ?, ?, ?)',
            [id_usuario, fecha_pedido, total, estado || 'pendiente']
        );

        res.status(201).json({ id_pedido: result.insertId, message: 'Pedido creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Obtener todos los pedidos
exports.obtenerPedidos = async (req, res) => {
    try {
        const [pedidos] = await pool.query('SELECT * FROM pedidos');
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Obtener un pedido por ID
exports.obtenerPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [pedido] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);

        if (pedido.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json(pedido[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Actualizar un pedido (excepto la fecha)
exports.actualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { total, estado } = req.body;

        const [result] = await pool.query(
            'UPDATE pedidos SET total = ?, estado = ? WHERE id_pedido = ?',
            [total, estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json({ message: 'Pedido actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Eliminar un pedido
exports.eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
