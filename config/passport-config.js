const GoogleStrategy = require("passport-google-oauth20").Strategy
// const keys = require("./key")
const User = require("../src/model/user-schema")

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      // option for google strategy
      clientID : process.env.CLIENTID,
      clientSecret : process.env.CLIENT_SECRET,
      callbackURL : "/auth/google/secrets"
    }, (accessToken, refreshToken,profile, email, done ) => {
      // here is callback function
      // console.log("Profile: ", profile)
      // console.log("Email: ", email)
      const googleId = email._json.sub
      const name = email._json.name
      const emailId = email._json.email
      const picture = email._json.picture

      // let me find user first if not create new user
      User.findOne({googleId : googleId})
        .then( user => {
          // if there is no user then we create new one and store in database
          if(!user) {
            console.log("You are a new user.")
            const newUser = new User({
              googleId : googleId,
              profile : {
                name : name,
                email : emailId,
                pictureUrl: picture,
              }
            })
            console.log("newUser that we want to save.", newUser)
            newUser.save().then( user => {
              console.log("This is the user that we save. ", user)
              done(null, user)
            }).catch(err => console.log(err))
          } 
          // if user is already in database
          else {
            console.log("You are already a user.")
            done(null, user)
          }
        })
        .catch(err => console.log(err))
      
    })
  )
}