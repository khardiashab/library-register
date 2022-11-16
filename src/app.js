// const env = require("dotenv")
// env.config()
const express = require("express")
const app = express()
const expressLayout = require('express-ejs-layouts')
const ejs = require("ejs")
const cookieSession = require("cookie-session")
const flash = require("connect-flash")
const mongoose = require("mongoose")
const session = require("express-session")
const User =require("./model/user-schema")

// require from our creating function
const keys = require("../config/key")
const passport = require("passport")
require("../config/passport-config")(passport)

// ejs 
app.set("view engine","ejs")
app.use(expressLayout)

// set public and views 
app.use(express.static(__dirname + "/../public/"))

// app set bodyparser
app.use(express.urlencoded({extended : true}))


// connect with database
mongoose.connect(process.env.MONGODBURI)
  .then( ()=> console.log("You succfully connected with mongodb...."))
  .catch(err => console.log("This error from mongodb connection: ", err))


app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized :false,
  cookie : {
    maxAge : 60*60*1000
  }
}))

// initializing passport
app.use(passport.initialize())
app.use(passport.session())

// let me serialize and deserialize
passport.serializeUser( (user, done) => {
  done(null, user.id)
})
passport.deserializeUser( (id, done) => {
  User.findById(id).then( user => {
    done(null, user)
  })
})

let ensurauthentication = (req, res, next) =>{
  if(!req.user){
    console.log("You are not taking the details with your self.")
    res.redirect("/")
  } else {
    next()
  }
}

  // set router 
  app.use("/", require("../routes/home"))
  app.use("/user", ensurauthentication, require("../routes/user"))



//  defining the port 
const port = process.env.PORT || 3000

app.listen(port, console.log(`App is running at port: ${port}`))
