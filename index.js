const { query, response } = require('express')
const express = require('express')
const { parse } = require('path')
const app = express()
const port = 3002
const path = require('path')
const pool = require('./dbCom')
const dbpool =require('./dbCom')
var bodyParser = require('body-parser')
const { json } = require('body-parser')
const TodoController = require('./Controllers/todoController')

const TODO_BASE_ROUTE = '/todo';

const todoController = new TodoController()

// creating middleware
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
  
  extended: true }))
app.get('/u', (req, res) => {
  res.send('Hello World!')

})

//Create api
app.get(TODO_BASE_ROUTE, todoController.getAll)
app.post('/todo/create', todoController.createTask)

app.get('/todo/filter', todoController.FilterTask)

app.put('/todo/update', todoController.UpdateTask)

app.put('/todo/update/status', todoController.UpdateStatus)

app.get('/todo/count', todoController.CountTask)

app.delete('/todo/delete', todoController.DeleteTask)


 
app.listen(port, () => {
    console.log(`Example app existing on port ${port}`)
})