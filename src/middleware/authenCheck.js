const jwt = require('jsonwebtoken')

const authCheck = function(req,res,next){
const headerTokan = req.headers["x-auth-token"]
if(!headerTokan){
    return res.send({status:false,msg:"header must be included"})
}
let decoded = jwt.verify(headerTokan,'functionUp-lithium');
if(!decoded){
    return res.send({status : false,msg:"tokan is invalid"});

}
next()
}
module.exports.Authencheck = authCheck