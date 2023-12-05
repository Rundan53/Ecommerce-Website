const sql = require('mysql2');

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'Rundan@99'
});

module.exports = pool.promise();