const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    database: 'postgres',
});
module.exports = {client};