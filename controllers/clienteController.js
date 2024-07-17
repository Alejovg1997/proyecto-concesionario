const pool = require('../models/conexionDB');
const transporter = require('../emailConfig'); 

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cliente');
        const clientes = result.rows;
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un cliente por ID
const getClienteById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM cliente WHERE id = $1', [id]);
        const cliente = result.rows[0];
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
    const { nombre, direccion, id_concesionario, correo_electronico } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO cliente (nombre, direccion, id_concesionario, correo_electronico) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, direccion, id_concesionario, correo_electronico]
        );
        const newCliente = result.rows[0];
        res.status(201).json(newCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un cliente por ID
const updateCliente = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, direccion, id_concesionario, correo_electronico } = req.body;
    try {
        const result = await pool.query(
            'UPDATE cliente SET nombre = $1, direccion = $2, id_concesionario = $3, correo_electronico = $4 WHERE id = $5 RETURNING *',
            [nombre, direccion, id_concesionario, correo_electronico, id]
        );
        const updatedCliente = result.rows[0];
        if (!updatedCliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(updatedCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un cliente por ID
const deleteCliente = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM cliente WHERE id = $1 RETURNING *', [id]);
        const deletedCliente = result.rows[0];
        if (!deletedCliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const obtenerClientePorId = async (idCliente) => {
    try {
        const result = await pool.query('SELECT * FROM cliente WHERE id = $1', [idCliente]);
        return result.rows[0];
    } catch (err) {
        console.error('Error al obtener cliente desde la base de datos:', err.message);
        throw err;
    }
};

module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    obtenerClientePorId,
    // Otros métodos de controlador según sea necesario
};
