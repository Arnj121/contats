const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const util = require('./util.js')
const cors = require('cors')

require('dotenv').config()
const corsOptions ={
    origin:'*',
    optionsSuccessStatus:200
}

const server = express()
server.use(bodyparser.urlencoded({extended: false}))
server.use(bodyparser.json())
server.use('/public',express.static('static'))
server.use(cors(corsOptions))

server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'static/index.html'))
})

server.get('/getcontactslist',util.getContactsList)
server.get('/getcontact',util.getContact)
server.post('/addcontact',util.addContact)
server.post('/updatecontact',util.updateContact)
server.delete('/deletecontact',util.deleteContact)
server.get('/search',util.search)

server.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`server listening on http://${process.env.HOST}:${process.env.PORT}/`)
})
