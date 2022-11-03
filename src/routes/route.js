const express = require('express');
const router = express.Router();
const newUserController= require("../controllers/newUsercontroller")
const Authen_check = require('../middleware/authenCheck')


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", newUserController.createUserNew )

 router.post("/login", newUserController.userLogin)


 router.get("/users/:userId",Authen_check.Authencheck, newUserController.userDetail)

router.put("/users/:userId", Authen_check.Authencheck,newUserController.updateUser)

router.delete('/users/:userId',Authen_check.Authencheck,newUserController.deleteuser)

module.exports = router;