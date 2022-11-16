const router = require("express").Router()
const User = require("../src/model/user-schema")
const findOrCreater = require("../helper/listCreater")
const dateChanger = require("../helper/dateTypeChanger")
const TaskList = require("../src/model/taskList")

router.get("/", (req, res) => {
  console.log(req.user.profile.name)
  if( typeof req.user.profile.age === "undefined" ){
    res.redirect("/user/details-form")
  } else {
    res.render("pages/userPage", {user : req.user})
  }
})
router.get("/details-form", (req, res) => {
  res.render("pages/user-details", {user : req.user.profile})
})


router.post("/details-form",  async(req, res) => {
  console.log(req)
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
  console.log(doc)
  res.redirect("/user/")
})

router.get("/todo-list", async(req, res) => {
  // console.log(req.user)
  let date = new Date();
  date = dateChanger(date);
  const task = await findOrCreater(req.user.googleId, date)
  // console.log("task: ", task)
  res.render("pages/list", {date : date, taskList : task})
})

// attendence page get method
router.get("/attendence", async(req, res) =>{
  res.render("pages/register")
})

// post method for checkbox of to do list
router.post("/list/check", async(req, res) => {
  const itemId = req.body.itemId
  // const listId = req.body.listId.trim()
  console.log(req.body)
  
 let doc = await TaskList.findOneAndUpdate({"tasks._id" : itemId} ,{$set : {"tasks.$.done" : true}})
//  console.log("list is here: ", doc)
 res.redirect("/user/todo-list")
})

//  post method for update the task
router.post("/list/newItem", async (req, res) =>{
  // console.log(req.body)
  const task = {
    name : req.body.newItem
  }
  let doc = await TaskList.findById(req.body.listId)
  doc.tasks.push(task)
  await doc.save()
  res.redirect("/user/todo-list")
})

// post method for delete the task
router.post("/list/delete", async(req,res) => {
  console.log(req.body)
  let doc = await TaskList.findById(req.body.listId)
  doc.tasks.pull(req.body.itemId)
  await doc.save()
  res.redirect("/user/todo-list")
})

module.exports = router