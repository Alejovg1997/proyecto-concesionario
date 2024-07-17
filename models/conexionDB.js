const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', // o la dirección IP de tu host
    database: 'Concesionario',
    password: 'Alejandrov19',
    port: 5433, // puerto por defecto de PostgreSQL
});
module.exports = pool;