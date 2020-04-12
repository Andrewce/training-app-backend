const { Pool } = require('pg')
const pool = new Pool ({
user: 'postgres',
host: 'localhost',
database: 'training-app',
password: 'docker',
port: 5432
})

;(async () => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const queryText = 'SELECT * FROM main'
    const res = await client.query(queryText)
    console.log(res)
    //const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
    //const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
   // await client.query(insertPhotoText, insertPhotoValues)
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
})().catch(e => console.error(e.stack))