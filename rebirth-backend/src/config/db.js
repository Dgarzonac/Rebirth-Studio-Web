require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 🔥 Probar conexión al crear el pool
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Conexión a la base de datos exitosa.");
        connection.release(); // Liberar conexión
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error.message);
        process.exit(1); // Detener la app si la BD no está disponible
    }
})();

module.exports = pool;
