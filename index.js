const { query } = require('express')
const express = require('express')
const app = express()
const port = 3002
const path = require('path')
// creating middleware
app.use(express.static('public'))


app.get('/u', (req, res) => {
  res.send('Hello World!')

})

app.listen(port, () => {
    console.log(`Example app existing on port ${port}`)
})