const express = require('express')
const route = express.Router()

const homeController = require('./src/Controller/homeController')
const serviceController = require('./src/Controller/serviceController')

//homepage with calendar
route.get('/', homeController.index)

//To create appointment
route.get('/appointment', homeController.toSchedule)
route.post('/create', serviceController.create)

//To import the appointments and send to calendar
route.get('/appointments', serviceController.AppointmentList)
route.get('/event/:id', serviceController.Appointment)
route.post('/finish', serviceController.finishAppointment)

route.get('/list', serviceController.AllAppointments)
route.get('/search', serviceController.searchAppointments)



module.exports = route