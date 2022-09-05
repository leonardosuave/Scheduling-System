const express = require('express')
const route = express.Router()

const homeController = require('./src/Controller/homeController')

route.get('/', homeController.index)

module.exports = route