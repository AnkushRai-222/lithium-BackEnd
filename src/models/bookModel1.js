const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name:{ 
        type:String,
        required:true
    },
    author_id: {
        type: ObjectId,
        ref: "newAuthor",
        required:true
    }, 
    price: Number,
    ratings: Number,
    publisher:{
        type: ObjectId,
        ref: "newPublisher",
        required:true
    },
    isHardCover:{
        type:Boolean,
        default:false
    }


}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
