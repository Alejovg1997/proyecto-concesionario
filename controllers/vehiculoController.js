const pool = require('../models/conexionDB');

// Obtener todos los vehículos
const getVehiculos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vehiculo');
        const vehiculos = result.rows;
        res.json(vehiculos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un vehículo por ID
const getVehiculoById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM vehiculo WHERE id = $1', [id]);
        const vehiculo = result.rows[0];
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json(vehiculo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo vehículo
const createVehiculo = async (req, res) => {
    const { marca, modelo, año, precio, id_concesionario } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO vehiculo (marca, modelo, año, precio, id_concesionario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [marca, modelo, año, precio, id_concesionario]
        );
        const newVehiculo = result.rows[0];
        res.status(201).json(newVehiculo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un vehículo por ID
const updateVehiculo = async (req, res) => {
    const id = parseInt(req.params.id);
    const { marca, modelo, año, precio, id_concesionario } = req.body;
    try {
        const result = await pool.query(
            'UPDATE vehiculo SET marca = $1, modelo = $2, año = $3, precio = $4, id_concesionario = $5 WHERE id = $6 RETURNING *',
            [marca, modelo, año, precio, id_concesionario, id]
        );
        const updatedVehiculo = result.rows[0];
        if (!updatedVehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json(updatedVehiculo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un vehículo por ID
const deleteVehiculo = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM vehiculo WHERE id = $1 RETURNING *', [id]);
        const deletedVehiculo = result.rows[0];
        if (!deletedVehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json({ message: 'Vehículo eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getVehiculos,
    getVehiculoById,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    // Otros métodos de controlador según sea necesario
};
