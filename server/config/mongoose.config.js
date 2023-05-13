const mongoose = require('mongoose')
const DB = process.env.DB_NAME

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('Connected to the DB'))
.catch((err)=>console.log('Not Connected',err))