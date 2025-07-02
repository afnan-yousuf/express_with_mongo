const mongo = require('mongoose')

const userSchema = mongo.Schema({
    uname: {
       type: String,
       required: true,
       unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    age: {
        type: Number,
        min: 18,
        max: 50
    },
    isactive: {
        type: Boolean,
        default: true
    },
    lastlogin: String
})

module.exports = mongo.model('user', userSchema)