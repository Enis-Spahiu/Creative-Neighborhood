const mongoose = require('mongoose')
const EventSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Event title is required!"]
    },
    date:{
        type:Date,
        required:[true,"Event date is required!"]
    },
    time:{
        type:String,
        required:[true,"Event time is required!"]
    },
    location:{
        type:String,
        required:[true,"Event location is required!"]
    },
    desc:{
        type:String,
        required:[true,"Event description is required!"]
    },
    wheelchair:{
        type:String
    },
    type:{
        type:String,
        enum:['online','inperson']
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
},{timestamps:true})
const Event = mongoose.model('Event', EventSchema)

module.exports = Event
