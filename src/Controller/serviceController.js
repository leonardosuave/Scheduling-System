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

exports.Appointment = async (req, res) => {

    try {
        if(!req.params.id) return res.send('404')
        const result = await Appointment.findById(req.params.id)
        if(!result) return res.redirect('/')
        res.render('event', {result})

    }catch(err) {
        console.log(err)
        res.send('404')
    }
}

exports.finishAppointment = async (req, res) => {
    
    try{
        //Poderia ser por params e assim não seria necessario fazer um input hidden
        if(!req.body.id) return res.send('404')
        const result = await Appointment.finish(req.body.id)
        if(!result) return res.send('404')
        res.redirect('/')
    }catch(err) {
        console.log(err)
        res.send('404')
    }
}

exports.AllAppointments = async (req, res) => {

    try{
        const result = await Appointment.getAll(true)
        res.render('list', {appos: result})
    }catch(err) {
        console.log(err)
        res.send('404')
    }
}

exports.searchAppointments = async (req, res) => {

    //Exemplo de formulário via method GET -> trabalha com req.query
    try {
        if(req.query.search == '') return res.redirect('/list') //Pq tem um appointment registrado como tudo em branco -> se apagar este appointment entao pode fazer a verificação através de result == undefined
        const result = await Appointment.search(req.query.search)
        res.render('list', {appos: result})
    }catch(err) {
        console.log(err)
        res.send('404')
    }
}