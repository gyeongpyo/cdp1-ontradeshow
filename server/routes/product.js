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

router.post("/", auth,(req, res) => {
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).join({ success: false, err });
    return res.status(200).json({ success: true });
  });
});


router.post("/products", (req, res) => {
  let order = req.aborted.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  
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

  if (term) {
    Product.find(findArgs)
    .find({ $text: { $search: term }})
    .populate("writer")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, info) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ 
        success: true,
        info ,
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
        success: true, 
        info ,
        postSize: info.length
      });
    })
  }
});


router.post("/getProducts",auth,(req,res)=> {

  Product.find()
  .exec((err,products) => {
    if(err) return res.status(400).json({success : false,err})
    res.status(200).json({success : true, products})
  })

});

router.get("/products_by_id", (req, res) => {
  // get방식에서는 req.query를 사용한다.
  let type = req.query.type;
  let productIds = req.query.id;

  /*
    id=value1, value2, value3로 오는 형식을
    id=[value1, value2, value3]로 바꿔야 한다.
  */
  if (type === "array") {
    let ids = req.query.id.split(',');
    productIds = [];
    productIds = ids.map(item => {
      return item
    })
  }

  Product.find({ '_id': {$in: productIds} })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(product)
    })

    
  
      

});


module.exports = router;