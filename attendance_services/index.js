const express = require('express')
const app = express()
const routes = require('./router')
var cors = require('cors')
if(process.env.NODE_ENV !== 'production') { 
require('dotenv').config() 
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(routes)

let port = process.env.PORT || 8081

app.listen(port , ()=>{
    console.log(`listening in port ${port}`)
})