

const userModel = require('../models/userModel');
const productModel=require('../models/productModel');
const orderModel = require("../models/orderModel");
const { isValidObjectId } = require('mongoose');

const createOrder = async function(req,res){
  const{userId,productId} = req.body;
  
  if(!userId || !productId){
    return res.send({status:false,message:"UserId and productId is required in body"})
  }

  if(isValidObjectId(userId)){
    return res.send({status:false,message:"UserId is invalid"})
  }
  

  if(isValidObjectId(productId)){
    return res.send({status:false,message:"productId is invalid"})
  }


  const userDetail =  await userModel.findById(userId)
  if(!userDetail){
    return res.send({status:false,message:"User not found in DB"})
  }

  const productDetail = await productModel.findById(productId);
  if(!productDetail){
    return res.send({status:false,message:"product not found in DB"})
  }

   const isFreeAppUser = req.isFreeAppUser
  if(isFreeAppUser){ //true
 
   const order = await orderModel.create({
     userId:userId,
     productId:productId,
     amount:0,
     isFreeAppUser:isFreeAppUser,
     date: new Date()
   })
   return res.send({status:true,data:order,message:"Order has been Created"})
  }
  else{
 //false

    if(userDetail.balance < productDetail.price){
        return res.send({status:false,message:"insfficient Balance"})
    }
    const orderDetail = {
        userId:userId,
        productId:productId,
        amount:productDetail.price,
        isFreeAppUser:isFreeAppUser,
        date: new Date()
    }

    const order = await orderModel.create(orderDetail);
    const user = await  orderModel.findByIdAndUpdate(userId,{$set:userDetail.balance - productDetail.price})

    return res.send({status:true,data:order,message:"Your  Order has Placed "})

  }

}
module.exports.createOrder=createOrder;




// const createAuthor= async function (req, res) {
//     let data = req.body
//     let authorId = data.dauthor_id
//     if(!authorId) return res.send({msg: 'AuthorId is mandatory in the request'})

//     let savedData= await authorModel.create(data)
//     res.send({data: savedData})
// }

// module.exports.createAuthor= createAuthor
