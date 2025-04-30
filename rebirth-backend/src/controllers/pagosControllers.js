const pool = require('../config/db');

// Crear un nuevo pago
exports.crearPago = async (req, res) => {
    try {
        const { id_pedido, tipo_pago, estado_pago, monto, fecha_pago } = req.body;
        
        const result = await pool.query(
            'INSERT INTO pagos (id_pedido, tipo_pago, estado_pago, monto, fecha_pago) VALUES (?, ?, ?, ?, ?)',
            [id_pedido, tipo_pago, estado_pago, monto, fecha_pago]
        );

        res.status(201).json({ message: 'Pago registrado', id_pago: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todos los pagos
exports.obtenerPagos = async (req, res) => {
    try {
        const [pagos] = await pool.query('SELECT * FROM pagos');
        res.json(pagos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener pago por ID
exports.obtenerPagoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [pago] = await pool.query('SELECT * FROM pagos WHERE id_pago = ?', [id]);

        if (pago.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        res.json(pago[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un pago
exports.actualizarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pedido, tipo_pago, estado_pago, monto, fecha_pago } = req.body;

        const result = await pool.query(
            'UPDATE pagos SET id_pedido = ?, tipo_pago = ?, estado_pago = ?, monto = ?, fecha_pago = ? WHERE id_pago = ?',
            [id_pedido, tipo_pago, estado_pago, monto, fecha_pago, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        res.json({ message: 'Pago actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un pago
exports.eliminarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM pagos WHERE id_pago = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        res.json({ message: 'Pago eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
