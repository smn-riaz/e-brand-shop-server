const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    cart:{
        type:Array,
        required: true
    },
    orderDate:{
        type: String,
        required: true
    },
    orderStatus:{
        type: String,
        enum:["pending", "done"],
        required: true
    },
    deliveryAddress:{
        type: Object,
        required: true,
    },
    amount:{
        type: Number,
        required: true
    },
})

module.exports = orderSchema;