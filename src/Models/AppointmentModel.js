const mongoose= require('mongoose')
const validator = require('validator')
const AppointmentFactory = require('../factories/AppointmentFactory')

const AppointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean
});
const Appo = mongoose.model('agendamento', AppointmentSchema)

class Appointment {

    constructor() {
        this.errors = []
    }

    async Create(name, email, description, cpf, date, time) {

        try {
            const newAppointment = new Appo({name, email, description, cpf, date, time, finished: false})
            await newAppointment.save();
            return true

        }catch(err) {
            console.log(err)
            return false
        }
    }

    async getAll(showFinished) {

        if(showFinished) {
            //Pega todas as consultas finalizadas ou não finalizadas
            return await Appo.find() 
        } else {
            //Pega consulta não finalizadas
            const appos = await Appo.find({'finished': false});
            const appointments = []
            
            //Tratamento do objeto por factories
            appos.forEach(res => {
                if(res.date != undefined) {
                    appointments.push(AppointmentFactory.Build(res))
                }
                
            })

            return appointments
        }
    }
}

module.exports = new Appointment()