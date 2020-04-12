const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { db } = require('./config')

const { bl } = require('./shop')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getBooks = (request, response) => {

  let books = bl.sellBook(id)
  response.status(200).json(books)

  db.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    }
    var r = response.status(200)
    r.json(results.rows)
  })
}

const addBook = (request, response) => {
  const { author, title } = request.body

  db.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Book added.' })
  })
}

function removeBook(request, response) {
  let id = request.query.id

  db.query('SELECT * from books WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length === 0) {
      console.log("id does not exist")
      response.status(404).json({ status: 'Fail', message: 'ID not found' })
      return
    }

    db.query('DELETE FROM books WHERE id =$1', [id], error => {
      if (error) {
        throw error
      }
      response.status(200).json({ status: 'success', message: 'book removed' })
    })
  })
}

function updateBook(request, response) {
  const { title, author } = request.body
  var id = request.query.id
  db.query('SELECT * FROM books WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length === 0) {
      console.log("id does not exist")
      response.status(404).json({ status: 'Fail', message: 'ID not found' })
      return
    }
    db.query('UPDATE books SET title=$1,author=$2 WHERE id=$3', [title, author, id], error => {
      if (error) {
        throw error
      }
      response.status(200).json({ status: 'success', message: 'book modified' })
    })
  })
}

app
  .route('/books')
  // GET endpoint
  .get(getBooks)
  // POST endpoint
  .post(addBook)
  .delete(removeBook)
  .put(updateBook)

app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
