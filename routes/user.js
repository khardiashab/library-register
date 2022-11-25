const router = require("express").Router()
const User = require("../src/model/user-schema")
const dailyList = require("../src/model/daily-list-schema")
const Quote = require("../src/model/quote-schema")
const dateChanger = require("../helper/dateTypeChanger")
const listMiddleware = require("../helper/listfinderMiddleware")


router.get("/", async(req, res) => {
  if( typeof req.user.profile.age === "undefined" ){
    res.redirect("/user/details-form")
  } else {
    let quote = await Quote.find()
    quote = quote[0].quote
    res.render("pages/userPage", {user : req.user, quote})
  }
})


router.get("/details-form", (req, res) => {
  res.render("pages/user-details", {user : req.user.profile})
})


router.post("/details-form",  async(req, res) => {
  const name = req.body.name
  const library = req.body.library
  const gender = req.body.gender
  const age = req.body.age
  const update = {
  
    "profile.age" : age,
    "profile.name" : name, 
    "profile.gender": gender,
    library : {
      name : library,
      longitude : 75.827,
      latitude : 28.102
    }
  }
  let doc = await User.findByIdAndUpdate( req.user._id,{$set : update}, { new : true} )
  // console.log(doc)
  res.redirect("/user/")
})

router.get("/todo-list", async(req, res) => {
  let date = new Date();
  date = dateChanger(date)
  let listId = req.user.googleId + date
  // let's find the data for today and send it to the browser
  let doc = await dailyList.findOne({"listId" : listId})
  res.render("pages/list", {dailyList : doc})
})

// attendence page get method
router.get("/attendence", listMiddleware,  async(req, res) =>{
  let date = new Date();
  date = dateChanger(date)
  let listId = req.user.googleId + date
  // let's find the data for today and send it to the browser
  let doc = await dailyList.findOne({"listId" : listId} )
  let present = doc.present
  

  res.render("pages/register", {
    objs : req.list,
    present,
  })
})


// attendence post method 
router.post("/attendence/coords", async(req,res) =>{
  let latitude = Number(req.body.latitude).toFixed(3)
  let longitude = Number(req.body.longitude).toFixed(3)

  if(latitude == req.user.library.latitude && longitude == req.user.library.longitude ) {

    let date = new Date();
    date = dateChanger(date)
    let listId = req.user.googleId + date
    let query = {
      "listId" : listId
    }
    let set = {
      $set : {"present" : true}
    }

    await dailyList.updateOne(query, set)

    res.redirect("/user/attendence")
  } else {
    req.flash("error_location", "You are not in Library. Try again..")
    res.redirect("/user/attendence")
  }
})
// post method for checkbox of to do list
router.post("/list/check", async(req, res) => {
  const itemId = req.body.itemId

  // qurey for searching the doc 
 let list_id = req.body.list_id
 let query = {"_id" : list_id, "taskList._id" : itemId}
  let set = {
    $set : {"taskList.$.done" : true}
  }

  await dailyList.updateOne(query , set)

 res.redirect("/user/todo-list")
})

//  post method for update the task
router.post("/list/newItem", async (req, res) =>{
  // create a task object to submit
  const task = {
    name : req.body.newItem
  }
  // * creating a qurey to searching the object in dailyList array
  // const doc = await dailyList.findById(req.body.listId)
  // doc.taskList.push(task)
  // await doc.save()

  // * making a push object to update the user
  let push = {"$push": {"taskList" : task}}
  
  await dailyList.findByIdAndUpdate(req.body.listId, push)

  res.redirect("/user/todo-list")
})

// post method for delete the task
router.post("/list/delete", async(req,res) => {
  let query = {"_id" : req.body.listId }
  let pull = {$pull : {"taskList" : {"_id" : req.body.itemId}}}
  await dailyList.updateOne(query, pull )

  res.redirect("/user/todo-list")
})

module.exports = router