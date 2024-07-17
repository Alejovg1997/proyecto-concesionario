const pool = require('../models/conexionDB');

const getConcesionarios = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Concesionario');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener concesionarios');
    }
};

const getConcesionarioById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM Concesionario WHERE ID = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).send('Concesionario no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener concesionario');
    }
};

const createConcesionario = async (req, res) => {
    const { nombre, direccion } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Concesionario (Nombre, Dirección) VALUES ($1, $2) RETURNING *',
            [nombre, direccion]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar concesionario');
    }
};

const updateConcesionario = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, direccion } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Concesionario SET Nombre = $1, Dirección = $2 WHERE ID = $3 RETURNING *',
            [nombre, direccion, id]
        );
        if (result.rows.length === 0) {
            res.status(404).send('Concesionario no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar concesionario');
    }
};

const deleteConcesionario = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM Concesionario WHERE ID = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).send('Concesionario no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar concesionario');
    }
};

module.exports = {
    getConcesionarios,
    getConcesionarioById,
    createConcesionario,
    updateConcesionario,
    deleteConcesionario
};
