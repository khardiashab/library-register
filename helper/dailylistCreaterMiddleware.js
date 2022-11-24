const dailyList = require("../src/model/daily-list-schema")
const dateChanger = require("./dateTypeChanger")
// console.log(list)

const task1 = {
  name : "Welcome to your Todo List.",
  done : false
}
const task2 = {
  name :"<--Click here After completing it." ,
  done : false
}
const task3 = {
  name :"To delete the task click here -->",
  done : false
}

module.exports = async (req, res, next) => {
  let id = req.user.googleId
  let d = new Date()
  d = dateChanger(d)
  const listId = id + d
  const query = {"listId" : listId}
  // console.log("query: ",query)
  let doc = await dailyList.findOne(query)

  // console.log(`this is doc : ${doc}`)
  if(!doc){
    // add a data to daily list
    user = new dailyList({
      listId : listId,
      day : d,
      present : false,
      taskList : [task1, task2, task3]
    }) 

  let list = await user.save()
  // console.log(`let the list is ${list}`)
  }
  next()
}