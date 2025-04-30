const pool = require('../config/db'); // Asegúrate de tener bien configurada la conexión a MySQL

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const [categorias] = await pool.query('SELECT * FROM categorias');
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una categoría por ID
exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);

        if (categoria.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.json(categoria[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar una nueva categoría
exports.agregarCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
        }

        const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ id: result.insertId, nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una categoría
exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const [result] = await pool.query('UPDATE categorias SET nombre = ? WHERE id_categoria = ?', [nombre, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.json({ message: 'Categoría actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
