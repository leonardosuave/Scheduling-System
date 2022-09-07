const mongoose= require('mongoose')
const validator = require('validator')

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
            return await Appo.find({'finished': false});
        }
    }
}

module.exports = new Appointment()