const userModel = require("../models/userModel");
const { createUser } = require("./userController");
const jwt = require('jsonwebtoken');

const CreateUser = async function (req, res) {
 try{
  const body = req.body;

  const { firstName, lastName, mobile, emailID, password } = body;

  if (!firstName || !lastName || !mobile || !emailID || !password) {
    return res.status(400).send({
      status: false,
      msg: "You missed Some Data its Mandatary",
    });
  } else {
    let savedata = await userModel.create(body);
    return res.status(201).send({ status: true, data: savedata });
  }
}
catch(error){
  return res.status(500).send({status:false,err:error.message})
}
};
module.exports.CreateUser = CreateUser;



const userLogin = async function (req, res) {
  try{
  const userName = req.body.emailId;
  const UserPassword = req.body.password;

  if (!userName)
    return res.status(400).send({ status: false, message: "email is required" });

  if (!UserPassword)
    return res.status(400).send({ status: false, message: "password is required" });

  const user = await userModel.findOne({
    emailId: userName,
    password: UserPassword,
  });

  if (!user) {
    return res.status(400).send({ status: false, message: "user not found" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      batch: "lithium",
    },
    "secret-key"
  );
  res.setHeader("x-auth-token", token);
  return res.status(200).send({ status: true, GenerateToken: token });
}
catch(error){
  return res.status(500).send({status:false,err:error.message})
}
};

module.exports.userLogin = userLogin;





const UserDetail = async function (req, res) {
 try{
  const user = req.params.userId;
  const findUser = await userModel.findById(user);
  if(!findUser){
    return res.status(404).send({status: false, message: "user not found" })
  }
return res.status(200).send({status: true,data:findUser })
}
catch(error){
  return res.status(500).send({status:false,err:error.message})
}
};
module.exports.UserDetail = UserDetail


const updateUser = async function(req,res){
try{
    let userId = req.params.userId;
    let user = await userModel.findById(userId)
    if(!user) return res.status(404).send({status:false,msg:"user not found/invalid user id"})
    const body = req.body
    let updateUser = await userModel.findOneAndUpdate({_id:userId},body,{new:true})
    res.status(200).send({status:true,updatedData:updateUser});
  }
  catch(error){
    return res.status(500).send({status:false,err:error.message})
  }
}

module.exports.updateUser = updateUser;

const deleteuser = async function(req,res){
  try{ 
  let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user){
        return res.status(404).send({status:false,msg:"user not found/invalid user id"})
    }
    let deleteVal = await userModel.findOneAndUpdate({_id:userId},{isDeleted:true},{new:true})
    res.status(200).send({status:true,DeletedData:deleteVal});
}
catch(error){
  return res.status(500).send({status:false,err:error.message})
}
}
module.exports.deleteuser = deleteuser;