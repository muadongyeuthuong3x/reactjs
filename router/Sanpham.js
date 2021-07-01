const router = require('express').Router()
const sanphamban= require('./../controller/Sanphamban')
const upload = require('./upload')
const { authmiddleware  }= require('../middleware/authmiddleware')
router.route('/createsanpham').post(upload.array("filesupload" , 6)   ,sanphamban.createsanpham ) 

router.route('/listsanpham').get(sanphamban.listSanpham ) 

router.route('/deletesanpham/:id').delete(sanphamban.deletesanpham) 

router.route('/editsanpham/:id').get(sanphamban.editsanpham) 

router.route('/getsanpham/:id').get(sanphamban.getsanpham) 

router.post('/savegiohang',authmiddleware,sanphamban.muasanpham)

router.get('/listdonhang',authmiddleware,sanphamban.listdonhang)



module.exports = router