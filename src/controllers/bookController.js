const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel1")

const createBook= async function (req, res) {
    let {author_id,publisher}= req.body
    if(!author_id){
        return res.send({msg:"Please enter author id"})
    }
    if(!publisher){
        return res.send({msg:"Please enter publicher"})
    }
    let data  = req.body
    let bookCreated = await bookModel.create(data)
    res.send({data: bookCreated})
}

const getAllBook = async function(req,res){
    let allBook = await bookModel.find().populate("author_id").populate("publisher")
    res.send({msg:allBook});
}


module.exports.createBook= createBook;
module.exports.getAllBook=getAllBook;
