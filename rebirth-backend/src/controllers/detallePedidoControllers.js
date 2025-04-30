const pool = require('../config/db'); // Asegúrate de que la conexión a MySQL está bien configurada

// Obtener todos los detalles de pedido
exports.obtenerDetallesPedido = async (req, res) => {
    try {
        const [detalles] = await pool.query('SELECT * FROM detallepedido');
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener detalles de un pedido específico por ID de pedido
exports.obtenerDetallePorPedido = async (req, res) => {
    try {
        const { id_pedido } = req.params;
        const [detalles] = await pool.query('SELECT * FROM detallepedido WHERE id_pedido = ?', [id_pedido]);

        if (detalles.length === 0) {
            return res.status(404).json({ message: 'No hay detalles para este pedido' });
        }

        res.json(detalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar un detalle de pedido
exports.agregarDetallePedido = async (req, res) => {
    try {
        const { id_pedido, id_producto, cantidad, subtotal } = req.body;

        if (!id_pedido || !id_producto || !cantidad || !subtotal) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const [result] = await pool.query(
            'INSERT INTO detallepedido (id_pedido, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)',
            [id_pedido, id_producto, cantidad, subtotal]
        );

        res.status(201).json({ id_detalle: result.insertId, id_pedido, id_producto, cantidad, subtotal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un detalle de pedido
exports.actualizarDetallePedido = async (req, res) => {
    try {
        const { id_detalle } = req.params;
        const { cantidad, subtotal } = req.body;

        const [result] = await pool.query(
            'UPDATE detallepedido SET cantidad = ?, subtotal = ? WHERE id_detalle = ?',
            [cantidad, subtotal, id_detalle]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }

        res.json({ message: 'Detalle de pedido actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un detalle de pedido
exports.eliminarDetallePedido = async (req, res) => {
    try {
        const { id_detalle } = req.params;
        const [result] = await pool.query('DELETE FROM detallepedido WHERE id_detalle = ?', [id_detalle]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }

        res.json({ message: 'Detalle de pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
