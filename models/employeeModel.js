const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    data: {
        type: JSON,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'P'
    },
    comment: {
        type: String,
    },

})

module.exports = mongoose.model('employee', employeeSchema)

//new code
