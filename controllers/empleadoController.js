const pool = require('../models/conexionDB');

// Obtener todos los empleados
const getEmpleados = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM empleado');
        const empleados = result.rows;
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un empleado por ID
const getEmpleadoById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM empleado WHERE id = $1', [id]);
        const empleado = result.rows[0];
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo empleado
const createEmpleado = async (req, res) => {
    const { nombre, cargo, salario, id_concesionario } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO empleado (nombre, cargo, salario, id_concesionario) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, cargo, salario, id_concesionario]
        );
        const newEmpleado = result.rows[0];
        res.status(201).json(newEmpleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un empleado por ID
const updateEmpleado = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, cargo, salario, id_concesionario } = req.body;
    try {
        const result = await pool.query(
            'UPDATE empleado SET nombre = $1, cargo = $2, salario = $3, id_concesionario = $4 WHERE id = $5 RETURNING *',
            [nombre, cargo, salario, id_concesionario, id]
        );
        const updatedEmpleado = result.rows[0];
        if (!updatedEmpleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(updatedEmpleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un empleado por ID
const deleteEmpleado = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM empleado WHERE id = $1 RETURNING *', [id]);
        const deletedEmpleado = result.rows[0];
        if (!deletedEmpleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
};
