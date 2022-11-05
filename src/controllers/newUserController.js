const userModel = require('../models/userModel');
const { createUser } = require('./userController');

const CreateUser = async function(req,res){
 
    const body = req.body;
   
    const {firstName,lastName,mobile,emailID,password} = body;


if(!firstName || !lastName || !mobile || !emailID || !password){
    
   return res.send({status:false,msg:"You missed Some Data its Mandatary"})
}else{
    let savedata = await userModel.create(body);
    return res.send({status:true,data:savedata})
} 
}
module.exports.CreateUser = createUser