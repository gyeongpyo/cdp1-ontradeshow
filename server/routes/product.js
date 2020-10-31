const express = require('express');
const router = express.Router();
var multer  = require('multer');
const { Product } = require('../models/Product');
const { auth } = require("../middleware/auth");


//=================================
//             Product
//=================================
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  });
   
var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
	upload(req, res, err=>{
			if(err) return res.json({success: false, err});
			return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename});
	})
});

router.post("/", (req, res) => {
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).join({ success: false, err });
    return res.status(200).json({ success: true });
  });
});


router.post("/products", (req, res) => {
  Product.find()
    .populate("writer")
    .exec((err, info) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, info });
    })
});

module.exports = router;
