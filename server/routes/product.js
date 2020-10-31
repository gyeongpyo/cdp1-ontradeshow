const express = require('express');
const router = express.Router();
var multer  = require('multer');

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

router.post("/image", auth, (req, res) => {
	upload(req, res, err=>{
			if(err) return res.json({success: false, err});
			return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename});
	})
});



module.exports = router;
