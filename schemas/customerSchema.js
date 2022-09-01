const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password:{
        type: String,
        required: true,
    },
    cart:{
        type: Array,
        required: true
    },
    userRole:{
        type: String,
        enum:["customer", "admin"]
    },
})



module.exports = customerSchema