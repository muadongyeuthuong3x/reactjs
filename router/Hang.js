const router = require('express').Router()
const hangsanpham= require('./../controller/Hangsanpham')

const { authmiddleware  }= require('../middleware/authmiddleware')

router.post('/addHang',authmiddleware,hangsanpham.createHang)

router.get("/listhang" ,authmiddleware , hangsanpham.listHang)


router.route('/deleteHang/:id').delete(authmiddleware,hangsanpham.deleteHang)

router.route('/editHang/:id').get(authmiddleware ,hangsanpham.editHang)


router.route('/updateHang/:id').put(authmiddleware ,hangsanpham.updateHang)


module.exports = router