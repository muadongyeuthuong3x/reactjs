
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {

      const filess = file.originalname.replace(/\s+/g, '');
     
      cb(null,  Date.now()+filess)
    }
  })
  var upload = multer({ storage });
  


  module.exports = upload;