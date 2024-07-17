// models/cliente.js
const { Pool } = require('pg');
const pool = new Pool();

const createClienteTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Cliente (
      ID SERIAL PRIMARY KEY,
      Nombre VARCHAR(100) NOT NULL,
      Direccion VARCHAR(200) NOT NULL,
      ID_Concesionario INTEGER NOT NULL,
      FOREIGN KEY (ID_Concesionario) REFERENCES Concesionario(ID)
    );
  `);
};

const getClientes = async () => {
  const res = await pool.query('SELECT * FROM Cliente');
  return res.rows;
};

const getClienteById = async (id) => {
  const res = await pool.query('SELECT * FROM Cliente WHERE ID = $1', [id]);
  return res.rows[0];
};

const createCliente = async (cliente) => {
  const { nombre, direccion, id_concesionario } = cliente;
  const res = await pool.query(
    'INSERT INTO Cliente (Nombre, Direccion, ID_Concesionario) VALUES ($1, $2, $3) RETURNING *',
    [nombre, direccion, id_concesionario]
  );
  return res.rows[0];
};

const updateCliente = async (id, cliente) => {
  const { nombre, direccion, id_concesionario } = cliente;
  const res = await pool.query(
    'UPDATE Cliente SET Nombre = $1, Direccion = $2, ID_Concesionario = $3 WHERE ID = $4 RETURNING *',
    [nombre, direccion, id_concesionario, id]
  );
  return res.rows[0];
};

const deleteCliente = async (id) => {
  await pool.query('DELETE FROM Cliente WHERE ID = $1', [id]);
};

module.exports = {
  createClienteTable,
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
