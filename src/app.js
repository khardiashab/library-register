// const env = require("dotenv")
// env.config()
const express = require("express")
const app = express()
const expressLayout = require('express-ejs-layouts')
const ejs = require("ejs")
const cookieSession = require("cookie-session")
const flash = require("connect-flash")
const mongoose = require("mongoose")
const MongoStore = require('connect-mongo')
const session = require("express-session")
const User =require("./model/user-schema")

// require from our creating function
// const keys = require("../config/key")
const passport = require("passport")
require("../config/passport-config")(passport)

// ejs 
app.set("view engine","ejs")
app.use(expressLayout)

// set public and views 
app.use(express.static(__dirname + "/../public/"))

// app set bodyparser
app.use(express.urlencoded({extended : true}))

// const url = "mongodb://localhost:27017/dbl"
// mongoose.connect(url)
//   .then( ()=> console.log("You succfully connected with mongodb...."))
//   .catch(err => console.log("This error from mongodb connection: ", err))
// connect with database
mongoose.connect(process.env.MONGODBURI)
  .then( ()=> console.log("You succfully connected with mongodb...."))
  .catch(err => console.log("This error from mongodb connection: ", err))


app.use(session({
  secret : process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: 'process.env.MONGODBURI',
    autoRemove: 'native' // Default
  }),
  resave : true,
  saveUninitialized :true,
  cookie : {
    maxAge : 86400000
  }
}))

// use of flash 
app.use(flash())
app.use(function(req, res, next){
  res.locals.error_location = req.flash("error_location");
  next();
});

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
// ! daily list creat middlware
const dcMiddleware = require("../helper/dailylistCreaterMiddleware")
app.use("/", require("../routes/home"))
app.use("/user", ensurauthentication, dcMiddleware,  require("../routes/user"))
// // ! localhost middleware for the website
// // const localhost = require("../helper/directMiddleware")
// app.use("/user", localhost, dcMiddleware,ensurauthentication, require("../routes/user"))

// ! random data 
// const randomData = require("../helper/randomDataCreater")
// randomData()


//  defining the port 
const port = process.env.PORT || 5000

app.listen(port, console.log(`App is running at port: ${port}`))
