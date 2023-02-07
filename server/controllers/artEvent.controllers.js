const Event = require('../models/artEvent.model')
const jwt = require('jsonwebtoken')

module.exports.getAllEvents=(req,res)=>{
    Event.find().sort({title: "ascending"})
        .then(allEvents=>res.json(allEvents))
        .catch(err=>res.json({message:'Missing Events',err}))
}
module.exports.createEvent=(req,res)=>{
    const event = new Event(req.body);
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });

    event.user_id = decodedJwt.payload._id;

    Event.create(event)
        .then(newEvent=>res.json(newEvent))
        .catch(err=>res.json({message:'Event not created',err}))
}
module.exports.getOneEvent=(req,res)=>{
    Event.findById(req.params.id)
        .populate("user_id", "username email -_id")
        .populate("comments", "comment user_id -_id")
        .then(oneEvent=>res.json(oneEvent))
        .catch(err=>res.json({message:'Missing Event',err}))
}
module.exports.deleteEvent=(req,res)=>{
    Event.deleteOne({_id: req.params.id})
        .then(delEvent=>res.json(delEvent))
        .catch(err=>res.json({message:'Could not delete event',err}))
}
module.exports.editEvent=(req,res)=>{
    Event.findByIdAndUpdate(req.params.id)
        .then(newEvent=>res.json(newEvent))
        .catch(err=>res.json({message:'Missing Events',err}))
}