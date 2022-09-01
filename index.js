const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const productHandler = require('./routeHandler/productHandler')
const customerHandler = require('./routeHandler/customerHandler')
// const paymentHandler = require('./routeHandler/paymentHandler')
const orderHandler = require('./routeHandler/orderHandler')

const port = process.env.PORT || 5000
require('dotenv').config()

// express app initialization
const app = express()


// use middleware
app.use(express.json())
app.use(cors())



// database connection through mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.alvcfcv.mongodb.net/?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true
})
    .then(() => console.log("Connection successful"))
    .catch(err => console.log(err))


// application routes declare
app.use('/product', productHandler)
app.use('/customer', customerHandler)
// app.use('/payment', paymentHandler)
app.use('/order', orderHandler)





// error handler
function errorHandler(err, req, res, next) {
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({error: err})
}



//listening port 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})