const express = require('express');
const path = require('path');
const app = express()
const session = require('express-session')
const flashMessages = require('connect-flash')

const {middlewareGlobal} = require('./src/middlewares/middleware')

const routers = require('./route')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

//Session
const sessionOptions = session({
    secret: 'ninguem vai saber o que é',
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/agendamento'}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60,
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flashMessages())

app.use(express.urlencoded({extended:false}));
app.use(express.json())

//View engine and static files
app.use(express.static('public'))
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/agendamento', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(middlewareGlobal)
app.use(routers)

app.listen(3030, () => {
    console.log('Connected Server!')
    console.log('http://localhost:3030')    
})