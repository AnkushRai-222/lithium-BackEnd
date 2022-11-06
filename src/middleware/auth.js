const jwt = require('jsonwebtoken')

const authCheck = function(req,res,next){
const headerTokan = req.headers["x-auth-token"]
if(!headerTokan){
    return res.send({status:false,msg:"header must be included"})
}
let decoded = jwt.verify(headerTokan, "secret-key");
if(!decoded){
    return res.send({status : false,msg:"tokan is invalid"});

}
req.decodeToken = decoded
next()
}
module.exports.Authencheck = authCheck

const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
  
    if(req.decodeToken.userId != req.params.userId){
        return res.send({status:false,message:"you are not authorised"})
    }
    next()
}
module.exports.authorise = authorise