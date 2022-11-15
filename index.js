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

/* app.post('/todo/create', async (req,res) =>{
  let result = await pool.query(`INSERT INTO public.todolist
    (task, done)
    VALUES($1, $2)`,
    [req.body.task,req.body.done]

    )
    res.json({
      "Status" :"Task created"
    })
    console.log("Api running")
} )
 */
//get all todo list tasks (along with filter get all done tasks)

app.get('/todo/filter',async (req,res)=>{

  let result= await pool.query(`SELECT id, task, done
  FROM public.todolist
  WHERE done='true';
  `)
  //console.log(result)
  let a= res.json({todo: result.rows})
  console.log(result)
 
  
})

//count api
//count of tasks { total, done , pending}
app.get('/todo/con',async (req,res)=>{
  let result = await pool.query(`Select  count (public.todolist.id) as Total , count(done) filter (where false) as pending, count(done) filter (where true) as done  from public.todolist`)
  res.send(result.rows)
})

//app.get(TODO_BASE_ROUTE, todoController.getAll)

app.get('/todo/count', async (req,res)=>{
  let result = await pool.query(`select count(*) as total,
   count(done) filter (where done = 'true') as Done,
   count(done) filter (where done = 'false') as Pending
   from public.todolist `)
   //res.json({todo: result.rows})

  //res.parse(result.rows)
  
  //var b = result.rows
  ///var a= JSON.stringify(b)
  //res.send(a)
  //console.log(result)
  var answer = result.rows
  console.log(`${JSON.stringify(result.rows[0], '{}', 2)}`);

})

//update description api

app.put('/todo/update', async (req,res) =>{
  let result = await pool.query(`UPDATE public.todolist
  SET  task=$2
  WHERE id=$1
  `,
  [req.body.id,req.body.task]
   

    )
    console.log(result)
    res.json({
      "Status" :"Task updated"
    })
    //console.log("Api running")
} )

//update task status

app.put('/todo/update/status', async (req,res) =>{
  let result = await pool.query(`UPDATE public.todolist
  SET  done=$2
  WHERE id=$1
  `,
  [req.body.id,req.body.done]
   

    )
    console.log(result)
    res.json({
      "Status" :"Task updated"
    })
    //console.log("Api running")
} )

//delete task api

app.delete('/todo/delete', async (req,res) =>{
  let result = await pool.query(`DELETE FROM public.todolist
  WHERE id=$1;
  `,
  [req.body.id]
   

    )
    console.log(result)
    res.json({
      "Status" :"Task updated"
    })
    //console.log("Api running")
} )


// filter all records from the table
/* app.get('/testdb',async (request, response) => {
    let res= await pool.query('select * from public.todoList')
    console.log(res.rows)
    //response.json({info: 'Node.js,Express, and postgres API'})
    response.json({ todo : res.rows})
    }) */
  
 
app.listen(port, () => {
    console.log(`Example app existing on port ${port}`)
})