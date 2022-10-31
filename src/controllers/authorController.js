const AuthorModel= require("../models/authorModel")
const publisherModel = require('../models/publisher')
const bookModel = require('../models/bookModel1');

const createAuthor= async function (req, res) {
    let {author_name}= req.body
    
    if(!author_name){
        return res.send({msg:"Please enter author Name"})
    }
    let data = req.body
    let authorCreated = await AuthorModel.create(data)
    res.send({data: authorCreated})
}

const bookUpdate = async function (req, res) {
    // For the books published by 'Penguin' and 'HarperCollins', update this key to true.
    let publisherOne= await publisherModel.findOne({name: "penguin" })
    let id1 = publisherOne._id
    let publicherTwo = await publisherModel.findOne({name: "HarperCollins" })
    let id2 = publicherTwo._id

    let newbooks = await bookModel.updateMany(
        {publisher:[id1,id2]},
        {  $set: {"isHardCover":true} },
        {new:true}
        )
    let updatedbooks = await bookModel.find({"isHardCover":true})
    res.send({data:updatedbooks})
}
const updatePrice= async function (req, res) {
    
    let findPrice = await AuthorModel.find({rating:{$gt: 3.5} })
    let newFind=[]
    for(i of findPrice){
        iid=i._id
        // let price11= await bookModel.findOne
       let requestSend= await bookModel.findOneAndUpdate(
            {author_id:iid},
            {$set:{"price":10}},
            {new:true} 
        )
        newFind.push(requestSend)
    }
    res.send({mess:newFind})
    
    
}
module.exports.updatePrice = updatePrice;
module.exports.getBookUpdate = bookUpdate;
module.exports.createAuthor= createAuthor
