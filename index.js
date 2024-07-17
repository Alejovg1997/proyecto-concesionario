const express = require('express');
const { Pool } = require('pg');


const app = express();
const port = process.env.PORT || 3000;
const concesionarioRoutes = require('./routes/concesionarioRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const insumoRoutes = require('./routes/insumoRoutes');
const almacenRoutes = require('./routes/almacenRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const compraRoutes=require('./routes/compraRoutes');
const detalleCompra=require('./routes/detalleVentaRoutes');

// Configura la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost', // o la dirección IP de tu host
    database: 'Concesionario',
    password: 'Alejandrov19',
    port: 5433, // puerto por defecto de PostgreSQL
});

// Verifica la conexión a la base de datos
pool.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
    } else {
        console.log('Conectado a la base de datos PostgreSQL');
    }
});

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Usar las rutas de concesionarios
app.use('/concesionarios', concesionarioRoutes);
app.use('/vehiculos', vehiculoRoutes);
app.use('/insumos', insumoRoutes);
app.use('/almacenes', almacenRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/compras',compraRoutes);
app.use('/detallesVentas',detalleCompra);

// Ruta básica
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Ruta para obtener datos de la base de datos
app.get('/concesionarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Concesionario');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener concesionarios');
    }
});

// Ruta para agregar un concesionario
app.post('/concesionarios', async (req, res) => {
    const { nombre, dirección } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Concesionario (Nombre, Dirección) VALUES ($1, $2) RETURNING *',
            [nombre, dirección]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar concesionario');
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
