const router = require("express").Router()
const User = require("../src/model/user-schema")
const Quote = require("../src/model/quote-schema")
const dateChanger = require("../helper/dateTypeChanger")
const histroyList = require("../helper/listfinder")


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
  // let's find the data for today and send it to the browser
  let doc = await User.findOne(
    {"_id": req.user._id, "dailyList.day" : date }, //find qurey 
    {"dailyList.$" : 1} // output qurey
  )
  res.render("pages/list", {dailyList : doc.dailyList[0]})
})

// attendence page get method
router.get("/attendence", async(req, res) =>{
  let date = new Date();
  date = dateChanger(date)
  // let's find the data for today and send it to the browser
  let doc = await User.findOne(
    {"_id": req.user._id, "dailyList.day" : date }, //find qurey 
    {"dailyList.present.$" : 1} // output qurey
  )
  let present = doc.dailyList[0].present
  
  let objList = await histroyList(req.user.googleId)

  res.render("pages/register", {
    objs : objList,
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
    let query = {
      "_id" : req.user._id,
      'dailyList.day' : date
    }
    let set = {
      $set : {"dailyList.$.present" : true}
    }
    let arrayFilter = {
      arrayFilters : [
        {"element.day" : date }
      ]
    }
    await User.updateOne(query , set, arrayFilter)

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
  let query = {
    "_id" : req.user._id,
    'dailyList._id' : req.body.listId
  }

  let set = {
    $set : {"dailyList.$[].taskList.$[element].done" : true}
  }
  let arrayFilter = {
    arrayFilters : [
      {"element._id" : req.body.itemId }
    ]
  }

  await User.updateOne(query , set, arrayFilter)

 res.redirect("/user/todo-list")
})

//  post method for update the task
router.post("/list/newItem", async (req, res) =>{
  // create a task object to submit
  const task = {
    name : req.body.newItem
  }
  // * creating a qurey to searching the object in dailyList array
  let query = {"_id" : req.user._id, "dailyList._id" : req.body.listId}

  // * making a push object to update the user
  let push = {"$push": {"dailyList.$.taskList" : task}}
  await User.updateOne(query, push)

  res.redirect("/user/todo-list")
})

// post method for delete the task
router.post("/list/delete", async(req,res) => {
  let query = {"_id" : req.user._id, "dailyList._id" : req.body.listId, }
  let pull = {$pull : {"dailyList.$.taskList" : {"_id" : req.body.itemId}}}
  await User.updateOne(query, pull )

  res.redirect("/user/todo-list")
})

module.exports = router