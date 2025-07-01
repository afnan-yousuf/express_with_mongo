const mongo = require('mongoose')

const studentSchema = mongo.Schema({
    name: String,
    dob: String,
    gender: String,
    phone: String,
    networth: Number,
    isactive: Boolean
})

module.exports = mongo.model('Student', studentSchema)