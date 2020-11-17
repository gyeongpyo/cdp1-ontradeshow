const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const {Payment} = require('../models/Payment');
const payment = require('../models/Payment');

const async = require('async');
const Product = require('../models/Product');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.post("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


successBuy

router.get('/successBuy',auth,(req,res) =>{

    let history = [];
    let transactionData= {};
    //1. put a bref payment information inside user collection

    req.body.cartDetail.forEach((item) =>{
        history.push({
            dateOfPurchase : Date.now(),
            name : item.title,
            id : item.id,
            price : item.price,
            quantity : item.quantity,
            paymentId: req.body.paymentData.paymentId
        })
    })

    //2.  put payment information that come from Paypal into Payment Collection

    transactionData.user = {

        id : req.user._id,
        name : req.user.name,
        lastname : req.user.lastname,
        email : req.user.email


    }


    transactionData.data = req.body.paymentData;
    transactionData.product = history

    User.findOneAndUpdate(

        {_id : req.user._id},
        {$push : {history : history},$set : {cart : [] } },
        {new : true},
        (err, user)=>{
            if(err) return res.json({success : false, err});

           const  Payment = new Payment(transactionData)
           if(err) return res.json({success: false, err});

            //3. increase the amount of number for the sold information

            //first we need to know how many product were sold in this transation for each of product


            let products  = [];
            doc.products.forEach(item => {
                products.push({id : item.id,quantity : item.quantity})
            })
            async.eachSeries(products, (item,callback) =>{
                Product.update(
                    {id : item.id},
                    {
                        $inc : {
                            "sold":item.quantity
                        }
                    },
                    {new : false},
                    callback
                )
            }, (err) => {
                if(err) return res.json({success: false,err})
                res.status(200).json({
                    success : true,
                    cart : user.cart,
                    cartDetail : []
                })
            })
        }

    )


   


}) 


module.exports = router;
