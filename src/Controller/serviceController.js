const Appointment = require("../Models/AppointmentModel")

exports.create = async (req, res) => {
    const {name, email, description, cpf, date, time} = req.body

    try {
        const result = await Appointment.Create(name,email,description,cpf,date,time)
        if(!result) {
            return res.send('Ocorreu uma falha')
        }
        req.flash('success', 'Consulta registrada.')
        return res.redirect('/')
    }catch(err) {
        console.log(err)
        res.send('404')
    }

}

exports.AppointmentList = async (req, res) => {

    try{
        const result = await Appointment.getAll(false)
        res.json(result)
    }catch(err) {
        console.log(err)
        res.send('404')
    }
}