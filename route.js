const express = require('express')
const route = express.Router()

const homeController = require('./src/Controller/homeController')
const serviceController = require('./src/Controller/serviceController')

route.get('/', homeController.index)
route.post('/create', serviceController.create)

module.exports = route