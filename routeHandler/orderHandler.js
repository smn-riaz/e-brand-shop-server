const express = require("express")
const mongoose = require("mongoose")
const orderSchema = require("../schemas/orderSchema")
const router = express.Router()

const Order = new mongoose.model("Order", orderSchema)


// ALL ORDERS
router.get("/allOrder", (req, res) => {
    Order.find({},((err, data)=>{
        if(err) {
            res.status(500).json({
                error:"There is a server side error!"
            })
        } else {
            res.status(200).json({
                data: data,
            })
        }
    }))
})


// ADD A ORDER
router.post("/addOrder", (req,res) => {
    console.log(req.body)
    const newOrder = new Order(req.body)
    newOrder.save((err) => {
        if(err){
            res.status(500).json({
                error:"There is a server side error!"
            })
        } else{
            res.status(200).json({
                message: "Order Added Successfully"
            })
        }
    })
})



// UPDATE A ORDER DETAILS
router.post("/updateOrder",(req,res) =>{
    Order.updateOne({_id:req.body.orderId},
        {$set:req.body},((err, data) => {
            if(err){
                res.status(500).json({
                    error: err
                })
            } else{
                res.status(200).json({
                    message: "Updated Successfully"
                })
            }
        }))
})



// DELETE A ORDER
router.delete("/deleteOrder", (req, res) =>{
    Order.deleteOne({_id: req.body.orderId},((err, data) => {
        if(err){
            res.status(500).json({
                error: "There is a server side error"
            })
        } else{
            res.status(200).json({
                message: "Order deleted Successfully"
            })
        }
    }))
})



module.exports = router