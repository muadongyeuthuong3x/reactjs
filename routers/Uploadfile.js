const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./client/public/image")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      const filename = file.originalname.replace(/\s+/g, '');
     cb(null,  uniqueSuffix + '-' + filename )
    
    }
  })
  
  var upload = multer({ storage: storage })

  module.exports = upload