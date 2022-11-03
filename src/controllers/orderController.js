

const userModel = require('../models/userModel');
const productModel=require('../models/productModel');
const orderModel = require("../models/orderModel");

const createOrder = async function(req,res){
   const body = req.body;
   const userID = body.userId
   const productID = body.productId;
   const status = body.isFreeAppUser;
   const amount = body.amount;
   if(status == false){
    const balanceUser = await userModel.findById(userID).select({balance:1,_id:-1})
    const productPrice = await productModel.findById(productID).select({price:1,_id:-1});
    const bal = balanceUser.balance;
    const price = productPrice.price
    if(bal < amount){
        return res.send({msg:"Your balance is less than Amount "})
    }
    else{
        const deduct = bal - amount
        const updateBalance = await userModel.findOneAndUpdate({_id:userID},{balance:deduct},{new:true});
        const Order = await orderModel.create(body);
        return res.send({AmountAvailable:deduct,msg:Order})
    }
   }else if (status == true){
    body.amount=0;
    const purchase = await orderModel.create(body);
    return res.send({msg:purchase});
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
