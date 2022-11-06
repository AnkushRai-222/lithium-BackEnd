const userModel = require("../models/userModel");
const { createUser } = require("./userController");
const jwt = require('jsonwebtoken');

const CreateUser = async function (req, res) {
  const body = req.body;

  const { firstName, lastName, mobile, emailID, password } = body;

  if (!firstName || !lastName || !mobile || !emailID || !password) {
    return res.send({
      status: false,
      msg: "You missed Some Data its Mandatary",
    });
  } else {
    let savedata = await userModel.create(body);
    return res.send({ status: true, data: savedata });
  }
};
module.exports.CreateUser = createUser;

const userLogin = async function (req, res) {
  const userName = req.body.emailId;
  const UserPassword = req.body.password;

  if (!userName)
    return res.send({ status: false, message: "email is required" });

  if (!UserPassword)
    return res.send({ status: false, message: "password is required" });

  const user = await userModel.findOne({
    emailId: userName,
    password: UserPassword,
  });

  if (!user) {
    return res.send({ status: false, message: "user not found" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      batch: "lithium",
    },
    "secret-key"
  );
  res.setHeader("x-auth-token", token);
  return res.send({ status: true, GenerateToken: token });
};

module.exports.userLogin = userLogin;

const UserDetail = async function (req, res) {
 
  const user = req.params.userId;
  const findUser = await userModel.findById(user);
  if(!findUser){
    return res.send({status: false, message: "user not found" })
  }
return res.send({status: true,data:findUser })

};
module.exports.UserDetail = UserDetail


const updateUser = async function(req,res){

    let userId = req.params.userId;
    let user = await userModel.findById(userId)
    if(!user) return res.send({status:false,msg:"user not found/invalid user id"})
    const body = req.body
    let updateUser = await userModel.findOneAndUpdate({_id:userId},body,{new:true})
    res.send({status:true,updatedData:updateUser});
}

module.exports.updateUser = updateUser;

const deleteuser = async function(req,res){
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user){
        return res.send({status:false,msg:"user not found/invalid user id"})
    }
    let deleteVal = await userModel.findOneAndUpdate({_id:userId},{isDeleted:true},{new:true})
    res.send({status:true,DeletedData:deleteVal});
}
module.exports.deleteuser = deleteuser;