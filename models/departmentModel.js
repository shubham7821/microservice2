
const mongoose = require('mongoose')

const DepartmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    is_deleted: {
        type: String,
        required: false,
    },
    created_at: {
        type: String,
        required: false,
    },
    created_by_id: {
        type: Number,
        required: false,
    },
    modified_by_id: {
        type: Number,
        required: false,
    },
    created_at: {
        type: String,
        required: false,
    }
})

module.exports = DepartmentsSchema