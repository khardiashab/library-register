const User = require("../src/model/user-schema")
let list = require("./randomDataCreater")
const dateChanger = require("./dateTypeChanger")
// console.log(list)

const task1 = {
  name : "Welcome to your Todo List.",
  done : false
}
const task2 = {
  name :"<--Click here After completing it." ,
  done : true
}
const task3 = {
  name :"To delete the task click here -->",
  done : false
}

module.exports = async (req, res, next) => {
  let id = req.user._id 
  let d = new Date()
  d = dateChanger(d)
  const query = {"_id" : id, "dailyList.day" : d}
  // console.log("query: ",query)
  let doc = await User.findOne(query, {"dailyList.$": 1})
  // console.log(`this is doc : ${doc}`)
  if(!doc){
    // add a data to daily list 
    let user = await User.findById(id)
    user.dailyList.push({
      day : d,
      tasklist : [task1, task2, task3]
    })
    user = await user.save()
  }
  next()
}