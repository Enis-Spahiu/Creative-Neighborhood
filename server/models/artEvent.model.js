const mongoose = require('mongoose')
const EventSchema = mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:Date
    },
    time:{
        type:String
    },
    location:{
        type:String
    },
    desc:{
        type:String
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
