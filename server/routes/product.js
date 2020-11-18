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
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs);
  console.log('term: ', term)
  if (term) {
    Product.find(findArgs)
    .find({ $text: { $search: term }})
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, info) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ 
        success: true, info ,
        postSize: info.length
      });
    })
  } else {
    Product.find(findArgs)
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, info) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ 
        success: true, info ,
        postSize: info.length
      });
    })
  }
});

router.get("/products_by_id", (req, res) => {
  // get방식에서는 req.query를 사용한다.
  let type = req.query.type;
  let productId = req.query.id;

  Product.find({ _id: productId })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send({ success: true, product })
    })

});



module.exports = router;
