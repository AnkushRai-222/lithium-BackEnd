const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    author_id:{
        type:Number,
        required:true
    },
    author_name:String,
    age:Number,
    address:String

},{timestamps:true})

const bookSchema = new mongoose.Schema({
    name:String,
    author_id:{
        type:Number,
        required:true
    },
    price:Number,
    ratings:Number

})

module.exports = mongoose.model('Author',authorSchema);
module.exports = mongoose.model('Authorbook',bookSchema);