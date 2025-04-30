const pool = require('../config/db');

// Obtener todos los productos
exports.getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.id_producto,
                p.nombre,
                p.descripcion,
                p.precio,
                i.talla,
                i.stock,
                i.color,
                img.url_imagen
            FROM productos p
            JOIN imagenes_producto img ON p.id_producto = img.id_producto
            JOIN inventario_tallas i ON p.id_producto = i.id_producto AND i.color = img.color
        `);

        const productosMap = {};

        for (const row of rows) {
            const id = row.id_producto;
            if (!productosMap[id]) {
                productosMap[id] = {
                    id_producto: row.id_producto,
                    nombre: row.nombre,
                    descripcion: row.descripcion,
                    precio: row.precio,
                    tallas: [],
                    imagenes: new Set()
                };
            }

            // Agregar la talla, stock y color al producto
            if (row.talla || row.stock || row.color) {
                productosMap[id].tallas.push({
                    talla: row.talla,
                    stock: row.stock,
                    color: row.color
                });
            }

            // Agregar la imagen si existe
            if (row.url_imagen) {
                const imageKey = `${row.url_imagen}  ${row.color}`;
                
                // Agregar la imagen solo si la clave no existe en el Set
                productosMap[id].imagenes.add(imageKey);  // Usamos la clave única
            }
        }

        // Ahora, convertimos el Set de imágenes a un array para usarlo en la interfaz
        for (const id in productosMap) {
            productosMap[id].imagenes = Array.from(productosMap[id].imagenes).map(imageKey => {
                const [url_imagen, color] = imageKey.split('  ');
                return { url_imagen, color };
            });
        }

        const productos = Object.values(productosMap);
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [producto] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        
        if (producto.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const [imagenes] = await pool.query('SELECT url_imagen FROM imagenes_producto WHERE id_producto = ?', [id]);

        producto[0].imagenes = imagenes.map(img => img.url_imagen);

        res.json(producto[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Agregar un producto
exports.addProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, id_categoria, imagen_url } = req.body;
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, imagen_url) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, id_categoria, imagen_url]
        );

        res.json({ id: result.insertId, message: 'Producto añadido' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un producto
exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, id_categoria, imagen_url } = req.body;
        const [result] = await pool.query(
            'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, id_categoria=?, imagen_url=? WHERE id_producto=?',
            [nombre, descripcion, precio, stock, id_categoria, imagen_url, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
