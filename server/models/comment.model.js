const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:[true, "Comment is required"],
        minlength:[3, "Your comment must be at least 3 characters long"]
    },
    // commentDate:{
    //     type:Date,
    //     required:[true, "Comment Date is required"],
    // },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:"An event id is required to create a comment"
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports = mongoose.model("Comment", CommentSchema)