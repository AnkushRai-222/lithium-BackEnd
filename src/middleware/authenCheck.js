const jwt = require('jsonwebtoken')

const authCheck = function(req,res,next){
    try{
const headerTokan = req.headers["x-auth-token"]
if(!headerTokan){
    return res.status(400).send({status:false,msg:"header must be included"})
}
let decoded = jwt.verify(headerTokan,'functionUp-lithium');
if(!decoded){
    return res.status(401).send({status : false,msg:"tokan is invalid"});

}
next()
}
catch(error){
    return res.status(500).send({status:false,error:error.message})
}
}
module.exports.Authencheck = authCheck