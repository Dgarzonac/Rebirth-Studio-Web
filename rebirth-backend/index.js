require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./src/middlewares/errorHandler');
const productosRoutes = require('./src/routes/productosRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const pedidosRoutes = require('./src/routes/pedidosRoutes');
const categoriasRoutes = require('./src/routes/categoriasRoutes');
const detallePedidoRoutes = require('./src/routes/detallePedidoRoutes');
const pagosRoutes = require('./src/routes/pagosRoutes');
const enviosRoutes = require('./src/routes/enviosRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Rutas
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/detallepedido', detallePedidoRoutes);
app.use('/pagos', pagosRoutes);
app.use('/envios', enviosRoutes);


// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
