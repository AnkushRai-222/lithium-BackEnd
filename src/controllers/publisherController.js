const publisherModel = require('../models/publisher');

const createPublicher = async function(req,res){
    let {name} = req.body;
    if(!name){
        return res.send({msg:"please input Name ,Nmae is required",status:false})
    }

    let data = req.body;
    let publisherData = await publisherModel.create(data);
    res.send({msg:publisherData}) ;
}

module.exports.createPublicher=createPublicher;