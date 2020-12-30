const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { Payment } = require('../models/Payment');

const async = require('async');
const { Product } = require('../models/Product');

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
        /* cart가 들어있지 않아서 페이지 이동시에 cart정보가 사라진다. */
        /* cart와 history가 있다면 정보를 넣어준다. */
        cart: req.user.cart,
        history: req.user.history
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

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});
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

router.post("/addToCart", auth, (req, res) => {
    /* 해당 user의 모든 정보를 가져온다. */
    User.findOne({_id: req.user._id },
        (err, userInfo) => {
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            }) 
            /* 상품이 이미 있으면 수량을 올려준다. */
            if (duplicate) {
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id": req.body.productId },
                    { $inc : {"cart.$.quantity": 1}},
                    { new: true }, // update정보를 받기 위해서 필요한 옵션
                    (err, userInfo) => {
                        if(err) return res.status(200).json({ success: false, err })
                        res.status(200).send(userInfo.cart);
                    }
                )
                
            /* 없으면 상품 정보를 넣어야 한다. */
            } else {
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new : true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart) 
                    }
                )
            }
        });
});

router.get('/removeFromCart', auth, (req, res) => {
    // cart에서 상품을 remove하고
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$pull":
            {"cart":{"id": req.query.id}}
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            // 남아있는 productid를 array형식으로 저장
            let array = cart.map(item => {
                return item.id;
            })
            
            Product.find({_id:{$in:array}})
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    );

})

router.post('/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    });

    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData;
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: {history: history}, $set: {cart: []}},
        { new: true },
        (err, user) => {
            if(err) return res.json({ success: false, err })
            
            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err })

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity})
                })


                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        {_id: item.id},
                        {
                            $inc: {
                                "sold":item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.status(400).json({success:false, err})
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })

                Product.update
            })
        }
    )
})

module.exports = router;
