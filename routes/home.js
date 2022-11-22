const router = require("express").Router()
const passport = require("passport")

router.get("/", (req, res) => {
  res.render("pages/home")
})


router.get("/auth/google", passport.authenticate("google", {scope : ["profile", "email"]}))

router.get("/auth/google/secrets", passport.authenticate("google"), (req,res) =>{
  // res.send("YOu are successfully come through it.")
  res.redirect("/user/")
})
module.exports = router