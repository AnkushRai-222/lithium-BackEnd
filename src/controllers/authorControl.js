const authorModel = require('../models/authorModel')
const bookmodel = require('../models/bookModel2')

const createAuthor = async function(req,res){
    let data = req.body;
    let authorId = data.author_id;
    if(!authorId){
        return res.send({msg:"author id is required"})
    }
    let saveData = await authorModel.create(data)
    res.send({msg:saveData});
}

module.exports.authorcreate = createAuthor