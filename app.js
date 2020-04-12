'use strict';
const { Client } = require('pg')

const client = new Client({
    user: 'docker',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432
})
client.connect()
client.query('SELECT * FROM main', (err, res) => {
    console.log("errors:", err)
    console.log("the results are ",'\n', res.rows)
    client.end()
})
