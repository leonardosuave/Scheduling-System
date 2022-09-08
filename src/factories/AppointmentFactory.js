//Recebe um objeto simples, processa ele e retorna um objeto complexo 

class AppointmentFactory{
    Build(simpleAppointment) {
        const day = simpleAppointment.date.getDate()+1;
        const month = simpleAppointment.date.getMonth()
        const year = simpleAppointment.date.getFullYear()
        const hour = Number.parseInt(simpleAppointment.time.split(':')[0])
        const minuts = Number.parseInt(simpleAppointment.time.split(':')[1])

        const startDate = new Date(year, month, day, hour, minuts, 0, 0)

        const appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + ' - ' + simpleAppointment.description,
            email: simpleAppointment.email,
            start: startDate,
            end: startDate,
            notified: simpleAppointment.notified
        }
        return appo
    }
}

module.exports = new AppointmentFactory()