const newUserModel = require('../models/newUserModel');
const jwt = require('jsonwebtoken')

const createUser = async function(req,res){
  try{
    let body = req.body;
    let savedata = await newUserModel.create(body);
    res.status(201).send({status:true,msg:savedata});
}
catch(error){
  return res.status(500).send({status:false,error:error.message})
}
}
module.exports.createUserNew=createUser


const userLogin = async function(req,res){
  try{
    const userEmail = req.body.emailId;
    const userPassword = req.body.password;
    
    const findUser = await newUserModel.findOne({emailId:userEmail,password:userPassword});
    if(!findUser){
        return res.status(400).send({status:false,msg:"email or password is incorrect"})
    }
    let mytoken = jwt.sign(
        {
            userId:findUser._id,
            Batch:"lithium",
            organization:"functionup"
        },
        'functionUp-lithium'
    );
    res.setHeader("x-auth-token",mytoken)
    res.status(201).send({status:true,data:mytoken});
 }  
 catch(error){
  return res.status(500).send({status:false,error:error.message})
} 
}
module.exports.userLogin=userLogin

const userDetail = async function(req,res){
try{
    let userId = req.params.userId;
    let user = await newUserModel.findById(userId)
    if(!user) return res.status(400).send({status:false,msg:"user not found/invalid user id"})
    res.status(200).send({status:true,data:user});
  } 
  catch(error){
    return res.status(500).send({status:false,error:error.message})
} 
}
module.exports.userDetail=userDetail

const updateUser = async function(req,res){
try{
    let userId = req.params.userId;
    let user = await newUserModel.findById(userId)
    if(!user) return res.status(400).send({status:false,msg:"user not found/invalid user id"})
    const body = req.body
    let updateUser = await newUserModel.findOneAndUpdate({_id:userId},body,{new:true})
    res.status(200).send({status:true,updatedData:updateUser});
 }   
 catch(error){
  return res.status(500).send({status:false,error:error.message})
}
}

module.exports.updateUser = updateUser;

const deleteuser = async function(req,res){
  try{
    let userId = req.params.userId;
    let user = await newUserModel.findById(userId);
    if(!user){
        return res.status(400).send({status:false,msg:"user not found/invalid user id"})
    }
    let deleteVal = await newUserModel.findOneAndUpdate({_id:userId},{isDeleted:true},{new:true})
    res.status(200).send({status:true,DeletedData:deleteVal});
  }  
  catch(error){
    return res.status(500).send({status:false,error:error.message})
}
}
module.exports.deleteuser = deleteuser;
