const Comment = require('../models/comment.model')
const Event = require('../models/artEvent.model')
const jwt = require('jsonwebtoken')

module.exports.getAllComments=(req,res)=>{
    Comment.find().sort({commentDate:"descending"})
        .populate("user_id", "username email")
        .then(allComments=>res.json(allComments))
        .catch(err=>res.json({message:'Missing Comments',err}))
}
module.exports.createComment=(req,res)=>{
    const comment = new Comment(req.body);
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });

    comment.user_id = decodedJwt.payload._id;

    Comment.create(comment)
        .then((newComment)=>{
            Event.findByIdAndUpdate(newComment.event, 
                {
                    $push: {comments: newComment._id}
                },
                {
                    new: true,
                    useFindAndModify: false,
                })
            .populate("comments", "-_id -__v -createdAt -updatedAt")
            .populate("user_id", "username -_id")
            .then((newEvent)=>{
                // res.json(newComment)
                res.json(newEvent)
            })
            .catch(err=>res.json({message:'Comment not added to movie',err}))
        })
        .catch(err=>res.json({message:'Comment not created',err}))
}
// module.exports.getOneEvent=(req,res)=>{
//     Event.findById(req.params.id)
//         .populate("user_id", "username email -_id")
//         .then(oneEvent=>res.json(oneEvent))
//         .catch(err=>res.json({message:'Missing Event',err}))
// }
// module.exports.deleteEvent=(req,res)=>{
//     Event.deleteOne({_id: req.params.id})
//         .then(delEvent=>res.json(delEvent))
//         .catch(err=>res.json({message:'Could not delete event',err}))
// }
// module.exports.editEvent=(req,res)=>{
//     Event.updateOne({_id: req.params.id})
//         .then(newEvent=>res.json(newEvent))
//         .catch(err=>res.json({message:'Missing Events',err}))
// }