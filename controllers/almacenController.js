const pool = require('../models/conexionDB');

const getAlmacenes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Almacen');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener almacenes');
    }
};

const getAlmacenById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM Almacen WHERE ID = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).send('Almacén no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener almacén');
    }
};

const createAlmacen = async (req, res) => {
    const { nombre, ubicacion } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Almacen (Nombre, Ubicacion) VALUES ($1, $2) RETURNING *',
            [nombre, ubicacion]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar almacén');
    }
};

const updateAlmacen = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, ubicacion } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Almacen SET Nombre = $1, Ubicacion = $2 WHERE ID = $3 RETURNING *',
            [nombre, ubicacion, id]
        );
        if (result.rows.length === 0) {
            res.status(404).send('Almacén no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar almacén');
    }
};

const deleteAlmacen = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM Almacen WHERE ID = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).send('Almacén no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar almacén');
    }
};

module.exports = {
    getAlmacenes,
    getAlmacenById,
    createAlmacen,
    updateAlmacen,
    deleteAlmacen
};
