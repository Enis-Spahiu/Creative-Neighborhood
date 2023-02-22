const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is mandatory!"]
    },
    email:{
        type:String,
        required:[true,"Email is mandatory!"]
    },
    password:{
        type:String,
        required:[true,"Password is mandatory!"]
    }
},{timestamps:true})

UserSchema.virtual("confirmPassword")
    .get(()=> this._confirmPassword)
    .set((value)=> this._confirmPassword = value);

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords didn't match.")
    }
    next();
})

UserSchema.pre('save',function(next){
    bcrypt.hash(this.password, 10)
    .then((hashedPassword)=>{
        console.log('My hash pwd:', hashedPassword)
        this.password = hashedPassword
        next()
    })
    .catch((err)=>{
        console.log(err)
    })
})

const User = mongoose.model('User',UserSchema)

module.exports = User;