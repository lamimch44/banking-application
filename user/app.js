//external inputs
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()

//internal inputs
const loginRouter = require('./router/loginRouter')
const signupRouter = require('./router/signupRouter')
const applicationRouter = require('./router/applicationRouter')

//connect to db
mongoose.connect(process.env.DB_CONNECT)
.then(() => {
    console.log('DB connection successfully established')
})
.catch((err) => {
    console.log(err)
})


//set template engine
app.set('view engine', 'ejs')
//parse body data
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//static public folder
app.use(express.static(path.join(__dirname, '/public')))

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

//use routers
app.use(loginRouter)
app.use('/signup', signupRouter)
app.use('/dashboard', applicationRouter)

//Server listening
app.listen(process.env.PORT, () => {
    console.log(`Server is listening at ${process.env.PORT} port`)
})