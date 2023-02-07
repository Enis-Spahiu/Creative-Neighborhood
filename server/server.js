const express = require('express')
const app = express()
const PORT = 8000
require('dotenv').config()
const cors = require('cors')

const cookieParser = require('cookie-parser')

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
}))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('./config/mongoose.config')

const routes = require('./routes/artEvent.routes')
routes(app)
const commentRoutes = require('./routes/comment.routes')
commentRoutes(app)
const userRoutes = require('./routes/user.routes')
userRoutes(app)

app.listen(process.env.MY_PORT, ()=>{
    console.log(`Connect on Port ` + process.env.MY_PORT)
})