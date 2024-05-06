const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'public/uploads')
	},
	filename: function (req, file, cb) {
	  console.log("body",req.body);
	  let imageName=req.body?.imageName
	  cb(null, imageName+".jpg")
	}
  })
  const upload = multer({ storage: storage });

module.exports={upload}