const router = require('express').Router()
const sanphamban= require('./../controller/Sanphamban')
const upload = require('./upload')

router.route('/createsanpham').post(upload.array("filesupload" , 6)   ,sanphamban.createsanpham ) 

router.route('/listsanpham').get(sanphamban.listSanpham ) 

router.route('/deletesanpham/:id').delete(sanphamban.deletesanpham) 

router.route('/editsanpham/:id').get(sanphamban.editsanpham) 



module.exports = router