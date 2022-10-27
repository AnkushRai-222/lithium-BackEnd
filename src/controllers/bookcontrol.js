const authorModel = require('../models/authorModel')
const bookmodel = require('../models/bookModel2')
const {authorcreate} = require('../controllers/authorControl')

const createBook = async function(req,res){
    let data = req.body;
    let authorId = data.author_id;
    if(!authorId){
        return res.send({msg:"author id is required"})
    }
    let saveData = await bookmodel.create(data)
    res.send({msg:saveData});
}

const bookchetan = async function(req,res){
    const findbook = await authorModel.find({author_name:"Chetan Bhagat"}).select({author_id:1});
    console.log(findbook);
    const data = await bookmodel.find({author_id:findbook[0].author_id})
    console.log(data);
    res.send({msg:data});
}

const findAuthor = async function(req,res){
    const findandUpdate = await bookmodel.findOneAndUpdate(
        {name:"Two states"},
        {$set:{price:200}},
        {new:true})
    const updateprice = findandUpdate.price;
    const author = await authorModel.find({author_id:{$eq:findandUpdate.author_id}}).select({author_name:1,_id:0})
    res.send({msg: author,updateprice})
}

const findBookCost = async function(req,res){
    let all_list = await bookmodel.find({price:{$gte:50,$lte:100}});

    let res1 = all_list.map(x=>x.author_id);
      console.log(res1);
    let newbook = await authorModel.find({author_id:res1}).select({author_name:1,_id:0});
    res.send({msg:newbook,all_list});
}

module.exports.createBook = createBook;
module.exports.bookchetan=bookchetan
module.exports.findAuthor = findAuthor
module.exports.findBookCost = findBookCost;