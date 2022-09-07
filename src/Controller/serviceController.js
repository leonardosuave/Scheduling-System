const Appointment = require("../Models/AppointmentModel")

exports.create = async (req, res) => {
    const {name, email, description, cpf, date, time} = req.body

    try {
        const result = await Appointment.Create(name,email,description,cpf,date,time)
        if(!result) {
            return res.sen('Ocorreu uma falha')
        }
        req.flash('success', 'Consulta registrada.')
        return res.redirect('/')
    }catch(err) {
        console.log(err)
        res.send('404')
    }

}