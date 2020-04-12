const { Client } = require('pg')
const client = new Client({
    user: 'docker',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432
})

//execute()

async function execute() {
    try {
        await client.connect()
        console.log("Connected successfully.")
        //await client.query("INSERT into main VALUES (5, 'John',23)")
        const results = await client.query('SELECT * FROM main')
        console.log("the results are ", '\n', results.rows)
    }
    catch (ex) {
        console.log("ERROR ERROR ERROR", ex)
    }
    finally {
        await client.end()
        console.log("DISCONECTED")

    }
}

