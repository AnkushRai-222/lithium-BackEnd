

const commonApi = async function(req,res,next){
   const ip = req.ip;
   const path = req.path
   const date = new Date();
   const currentDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
   console.log(currentDate,ip,path);
    next();
     return res.send({msg:"Look at the Console for your output"})
   
}


module.exports.commonMiddle = commonApi;