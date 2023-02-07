const mongoose = require('mongoose')
const dbName = process.env.DB_NAME

mongoose.connect('mongodb://localhost/' + dbName,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('Connected to the DB'))
.catch((err)=>console.log('Not Connected',err))