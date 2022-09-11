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


// GET A CUSTOMER
router.post("/aCustomer", async(req, res) => {

    try{
        const data = await Customer.find({_id: req.body._id})
        res.status(200).json({
            data: data
        })

    } catch(err){
        res.status(500).json({
            error: "There is a server side error!"
        })
    }
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



// DELETE A CUSTOMER
router.post("/deleteCustomer", (req, res) => {
Customer.deleteOne({_id:req.body._id}, ((err) => {
    if(err){
        res.status(500).json({
            error:"There is a server side error!"
        })
    } else{
        res.status(200).json({
            data: "Successfully Cart Deleted"
        })
    }
}) )
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


//ADD CART DATA
router.post("/addCart", (req, res) => {
    
    Customer.updateOne({_id:req.body._id}, {
        $push: {
            cart: req.body
        }
    }, ((err) => {
        if(err){
            res.status(500).json({
                error:"There is a server side error!"
            })
        } else{
            res.status(200).json({
                data: "Successfully Carted"
            })
        }
    }))
})


// DELETE CART DATA
router.post("/deleteCart", (req, res) => {

    Customer.updateOne({_id:req.body._id}, {
        $pull: {
            cart: {productId:req.body.productId}
        }
    }, ((err) => {
        if(err){
            res.status(500).json({
                error:"There is a server side error!"
            })
        } else{
            res.status(200).json({
                data: "Successfully Cart Deleted"
            })
        }
    }) )
})

// PLACE ORDER & CART BLANK
router.post("/placeOrderBlankCart", (req, res) => {
    
    Customer.update({_id:req.body._id}, {
        $set: {
            cart: []
        }
    }, ((err) => {
        if(err){
            res.status(500).json({
                error:"There is a server side error!"
            })
        } else{
            res.status(200).json({
                message:"Successfully Order Placed"
            })
        }
    }))
})

module.exports = router