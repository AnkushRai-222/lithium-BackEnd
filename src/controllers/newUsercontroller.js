const newUserModel = require('../models/newUserModel');
const jwt = require('jsonwebtoken')

const createUser = async function(req,res){
    let body = req.body;
    let savedata = await newUserModel.create(body);
    res.send({status:true,msg:savedata});

}
module.exports.createUserNew=createUser


const userLogin = async function(req,res){
    const userEmail = req.body.emailId;
    const userPassword = req.body.password;
    
    const findUser = await newUserModel.findOne({emailId:userEmail,password:userPassword});
    if(!findUser){
        return res.send({status:false,msg:"email or password is incorrect"})
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
    res.send({status:true,data:mytoken});
    
}
module.exports.userLogin=userLogin

const userDetail = async function(req,res){

    let userId = req.params.userId;
    let user = await newUserModel.findById(userId)
    if(!user) return res.send({status:false,msg:"user not found/invalid user id"})
    res.send({status:true,data:user});
}
module.exports.userDetail=userDetail

const updateUser = async function(req,res){

    let userId = req.params.userId;
    let user = await newUserModel.findById(userId)
    if(!user) return res.send({status:false,msg:"user not found/invalid user id"})
    const body = req.body
    let updateUser = await newUserModel.findOneAndUpdate({_id:userId},body,{new:true})
    res.send({status:true,updatedData:updateUser});
}

module.exports.updateUser = updateUser;

const deleteuser = async function(req,res){
    let userId = req.params.userId;
    let user = await newUserModel.findById(userId);
    if(!user){
        return res.send({status:false,msg:"user not found/invalid user id"})
    }
    let deleteVal = await newUserModel.findOneAndUpdate({_id:userId},{isDeleted:true},{new:true})
    res.send({status:true,DeletedData:deleteVal});
}
module.exports.deleteuser = deleteuser;
