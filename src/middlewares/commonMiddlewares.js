const { isValidObjectId } = require("mongoose");

const headerValid = function (req ,res , next){
     const isAvail = req.headers["isfreeappuser"] 
     if(!isAvail){
       return res.send({msg:"the request is missing a mandatory header"})
     }
    
      next();
    
   
}

const validUserAndProduct = async function(req,res,next){
   const {userId,productId}=req.body;
   const validUser = isValidObjectId(userId)
   const validProduct = isValidObjectId(productId);
   if(!validUser){
      return res.send({msg:"your user id is invalid or not mentionsed"})
   }else if(!validProduct){
      return res.send({msg:"your product  id is invalid or not mentionsed"})

   }
   next();
}
module.exports.validUserAndProduct=validUserAndProduct;
module.exports.headerValid=headerValid;
// const mid1= function ( req, res, next) {
//     req.falana= "hi there. i am adding something new to the req object"
//     console.log("Hi I am a middleware named Mid1")
//     next()
// }

// const mid2= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }

// const mid3= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid3")
//     next()
// }

// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }

// const myMiddleware = function(req, res, next){
//     req.month = "November"
//     console.log('I am inside a middleware!')
//     next()
// }

// const myOtherMiddleware = function(req, res, next){
//     // Setting an attribute 'wantsJson' in request
//     // The header value comparison is done once and
//     // the result can be used directly wherever required.
//     let acceptHeaderValue = req.headers["accept"]

//     if(acceptHeaderValue == "application/json") {
//         req.wantsJson = true
//     } else {
//         req.wantsJson = false
//     }
//     next()
// }

// module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4
// module.exports.myMiddleware = myMiddleware
// module.exports.myOtherMiddleware = myOtherMiddleware
