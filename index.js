const { query, response } = require('express')
const express = require('express')
const { parse } = require('path')
const app = express()
const port = 3002
const path = require('path')
const pool = require('./dbCom')
const dbpool =require('./dbCom')
var bodyParser = require('body-parser')

// creating middleware
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
  
  extended: true }))
app.get('/u', (req, res) => {
  res.send('Hello World!')

})

app.post('/todo/create', async (req,res) =>{
  let result = await pool.query(`INSERT INTO public.todolist
    (id, task, done)
    VALUES($1, $2, $3)`,
    [req.body.id,req.body.task,req.body.done]

    )
    res.json({
      "Status" :"Task created"
    })
    console.log("Api running")
} )


app.put('/todo/update', async (req,res) =>{
  let result = await pool.query(`UPDATE public.todolist
  SET  done=true
  WHERE id=10;
  `
   

    )
    res.json({
      "Status" :"Task updated"
    })
    console.log("Api running")
} )



app.get('/testdb',async (request, response) => {
    let res= await pool.query('select * from public.todoList')
    console.log(res.rows)
    //response.json({info: 'Node.js,Express, and postgres API'})
    response.json({ todo : res.rows})
    })
  
 
app.listen(port, () => {
    console.log(`Example app existing on port ${port}`)
})