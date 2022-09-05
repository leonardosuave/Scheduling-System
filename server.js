const express = require('express');
const path = require('path');
const app = express()
const routers = require('./route')
const mongoose = require('mongoose')

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(express.static('public'))
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/agendamento', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(routers)

app.listen(3030, () => {
    console.log('Connected Server!')
    console.log('http://localhost:3030')    
})