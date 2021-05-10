const router = require("express").Router()

const User  = require("../controllers/User");

const uploadfile = require("../routers/Uploadfile");


router.post("/registeer", User.registeer)

router.post("/login", User.login)

router.post("/registeeradmin", uploadfile.single('image') ,User.registeradmin)

router.get("/listUserAdmin"  ,User.getListUser)

router.get("/editadmin/:id"  , User.editUser )


router.put("/updateadmin/:id" , uploadfile.single('image')  , User.upDateUser )

router.delete("/deleteadmin/:id"  , User.DeleteAdmin )

router.post("/google_login", User.googleLogin)

module.exports = router

