const pool = require('../models/conexionDB');

// Obtener todas las compras
const getCompras = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM compra');
        const compras = result.rows;
        res.json(compras);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener una compra por ID
const getCompraById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM compra WHERE id = $1', [id]);
        const compra = result.rows[0];
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.json(compra);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear una nueva compra
const createCompra = async (req, res) => {
    const { fecha, id_cliente, id_empleado, precio_total } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO compra (fecha, id_cliente, id_empleado, precio_total) VALUES ($1, $2, $3, $4) RETURNING *',
            [fecha, id_cliente, id_empleado, precio_total]
        );
        const newCompra = result.rows[0];
        res.status(201).json(newCompra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar una compra por ID
const updateCompra = async (req, res) => {
    const id = parseInt(req.params.id);
    const { fecha, id_cliente, id_empleado, precio_total } = req.body;
    try {
        const result = await pool.query(
            'UPDATE compra SET fecha = $1, id_cliente = $2, id_empleado = $3, precio_total = $4 WHERE id = $5 RETURNING *',
            [fecha, id_cliente, id_empleado, precio_total, id]
        );
        const updatedCompra = result.rows[0];
        if (!updatedCompra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.json(updatedCompra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar una compra por ID
const deleteCompra = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM compra WHERE id = $1 RETURNING *', [id]);
        const deletedCompra = result.rows[0];
        if (!deletedCompra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.json({ message: 'Compra eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getCompras,
    getCompraById,
    createCompra,
    updateCompra,
    deleteCompra,
};
