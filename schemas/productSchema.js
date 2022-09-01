const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: Array,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    instock: {
        type: Number,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    size: {
        type: Array,
        requied: true
    },
    offerPrice:{
        type: Number,
        required: true
    },
    productId:{
        type: String,
        required: true
    }
})



module.exports = productSchema