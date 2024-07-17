const pool = require('../models/conexionDB');

// Obtener todos los insumos
const getInsumos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM insumo');
        const insumos = result.rows;
        res.json(insumos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un insumo por ID
const getInsumoById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM insumo WHERE id = $1', [id]);
        const insumo = result.rows[0];
        if (!insumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.json(insumo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo insumo
const createInsumo = async (req, res) => {
    const { nombre, cantidad, precio_unitario } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO insumo (nombre, cantidad, precio_unitario) VALUES ($1, $2, $3) RETURNING *',
            [nombre, cantidad, precio_unitario]
        );
        const newInsumo = result.rows[0];
        res.status(201).json(newInsumo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un insumo por ID
const updateInsumo = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, cantidad, precio_unitario } = req.body;
    try {
        const result = await pool.query(
            'UPDATE insumo SET nombre = $1, cantidad = $2, precio_unitario = $3 WHERE id = $4 RETURNING *',
            [nombre, cantidad, precio_unitario, id]
        );
        const updatedInsumo = result.rows[0];
        if (!updatedInsumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.json(updatedInsumo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un insumo por ID
const deleteInsumo = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM insumo WHERE id = $1 RETURNING *', [id]);
        const deletedInsumo = result.rows[0];
        if (!deletedInsumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.json({ message: 'Insumo eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getInsumos,
    getInsumoById,
    createInsumo,
    updateInsumo,
    deleteInsumo,
};
