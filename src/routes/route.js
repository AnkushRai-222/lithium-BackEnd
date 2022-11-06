const express = require('express');
const router = express.Router();
const userController= require("../controllers/newUserController")
const Middleware = require('../middleware/auth')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.CreateUser)

 router.post("/login", userController.userLogin);

//The userId is sent by front end
 router.get("/users/:userId",Middleware.Authencheck, Middleware.authorise,userController.UserDetail)
// router.post("/users/:userId/posts", userController.postMessage)

 router.put("/users/:userId",Middleware.Authencheck,Middleware.authorise ,userController.updateUser)
 router.delete('/users/:userId', Middleware.Authencheck,Middleware.authorise,userController.deleteuser)

module.exports = router;