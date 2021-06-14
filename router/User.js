

const router = require('express').Router()
const User= require('./../controller/User')


router.route('/dangkitaikhoan').post(User.dangkitaikhoan)

router.route('/dangnhap').post(User.dangnhap)

router.route('/listuserchat').get(User.listuserchat)


module.exports = router