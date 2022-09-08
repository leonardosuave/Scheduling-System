const mongoose= require('mongoose')
const validator = require('validator')
const AppointmentFactory = require('../factories/AppointmentFactory')
const nodemailer = require('nodemailer')

const AppointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean,
    notified: Boolean
});
const Appo = mongoose.model('agendamento', AppointmentSchema)

class Appointment {

    constructor() {
        this.errors = []
    }

    async Create(name, email, description, cpf, date, time) {

        try {
            const newAppointment = new Appo({
                name, 
                email, 
                description, 
                cpf, 
                date, 
                time, 
                finished: false,
                notified: false
            })
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

    async findById(id) {
        if(typeof id !== 'string') return;
        return await Appo.findOne({'_id': id})
    }

    async finish(id) {
        if(typeof id !== 'string') return;
        return await Appo.findByIdAndUpdate(id, {finished: true})
    }

    async search(query) {
        return Appo.find().or([{email: query}, {cpf: query}])
    }

    async sendNotification() {

        const appos = await this.getAll(false)

        //Estrutura base para configuração da biblioteca de envio nodemailer
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "2af9f537f5f72b",
              pass: "5f564d74dad554"
            }
          });

        appos.forEach(async app => {

            const date = app.start.getTime()
            const hour = 1000*60*60
            const gap = date-Date.now()

            if(gap <= hour) {

                //Caso não tenha enviado email ainda
                if(!app.notified) {

                    await Appo.findByIdAndUpdate(app.id, {notified: true}) //Seta notified como ja enviado

                    //Estrutura com as informaçoes de envio do email.
                    transport.sendMail({
                        from: 'Leonardo Suave <leonardo.suave15@hotmail.com>',
                        to: app.email,
                        subject: 'Aviso de consulta em breve.',
                        text: `Sua consulta está agendada para ${app.start.getHours()}:${app.start.getMinutes()} de hoje. Muito obrigado.`
                        }). then(msg => {
                            console.log(msg)
                        }).catch(err => {
                            console.log(err)
                        })
                    
                }
            }
        })
    }
}

module.exports = new Appointment()