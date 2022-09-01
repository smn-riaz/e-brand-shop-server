const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const customerSchema = require("../schemas/customerSchema")


// create a model using touristSchema
const Customer = new mongoose.model("Customer", customerSchema)


// GET ALL CUSTOMER
router.get("/allCustomer", (req, res) => {
    Customer.find({}, ((err, data)=> {
        if(err) {
            res.status(500).json({
                error:"There is a server side error!"
            })
        } else {
            res.status(200).json({
                data: data,
                message: "Success"
            })
        }
    }))
})



// POST A CUSTOMER
router.post("/addCustomer", (req, res) => {

    const newCustomer = new Customer(req.body)
    newCustomer.save((err)=>{
        if(err){
            res.status(500).json({
                error: "There is a server side error!"
            })
        } else {
            res.status(200).json({
                message: "Customer added successfully!"
            })
        }
    })
})


// EMAIL Check Available(async await)
router.post("/isEmailAvailable", async(req, res) => {
    try{
        const data = await Customer.find({email: req.body.email})
        res.status(200).json({
            result: data.length,
            message: "Success",
            data: data
        })

    } catch(err){
        res.status(500).json({
            error: "There is a server side error!"
        })
    }
})


//SIGN IN
router.post("/signin", async(req, res) => {
  
    try{
        const data = await Customer.find({email:req.body.email, password: req.body.password})
        res.status(200).json({
            data: data,
            message: "Success"
        })
    } catch(err){
        res.status(500).json({
            error:"There is a server side error!"
        })
    }
})


//UPDATE CART DATA
router.post("/cartUpdate", (req, res) => {
    Customer.findByIdAndUpdate({_id:req.body._id}, {
        $set: {
            cart:req.body.cart
        }
    },{
        useFindAndModify: false
    }, ((err, data) => {
        if(err){
            res.status(500).json({
                error:"There is a server side error!"
            })
        } else{
            res.status(200).json({
                data: data,
            })
        }
    }))
})

module.exports = router