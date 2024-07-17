const pool = require('../models/conexionDB');

// Obtener todos los detalles de venta
const getDetallesVenta = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM detalle_venta');
        const detallesVenta = result.rows;
        res.json(detallesVenta);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un detalle de venta por ID
const getDetalleVentaById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM detalle_venta WHERE id = $1', [id]);
        const detalleVenta = result.rows[0];
        if (!detalleVenta) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }
        res.json(detalleVenta);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo detalle de venta
const createDetalleVenta = async (req, res) => {
    const { id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO detalle_venta (id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total]
        );
        const newDetalleVenta = result.rows[0];
        res.status(201).json(newDetalleVenta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un detalle de venta por ID
const updateDetalleVenta = async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total } = req.body;
    try {
        const result = await pool.query(
            'UPDATE detalle_venta SET id_compra = $1, id_producto = $2, tipo_producto = $3, cantidad = $4, precio_unitario = $5, precio_total = $6 WHERE id = $7 RETURNING *',
            [id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total, id]
        );
        const updatedDetalleVenta = result.rows[0];
        if (!updatedDetalleVenta) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }
        res.json(updatedDetalleVenta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un detalle de venta por ID
const deleteDetalleVenta = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM detalle_venta WHERE id = $1 RETURNING *', [id]);
        const deletedDetalleVenta = result.rows[0];
        if (!deletedDetalleVenta) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }
        res.json({ message: 'Detalle de venta eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getDetallesVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta,
};
