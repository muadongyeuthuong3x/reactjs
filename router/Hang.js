const router = require('express').Router()
const hangsanpham= require('./../controller/Hangsanpham')

const auth = require('../middleware/auth')

router.route('/addHang').post(hangsanpham.createHang)

router.route('/listHang').get(auth ,hangsanpham.listHang)

router.route('/deleteHang/:id').delete(hangsanpham.deleteHang)

router.route('/editHang/:id').get(hangsanpham.editHang)


router.route('/updateHang/:id').put(hangsanpham.updateHang)


module.exports = router