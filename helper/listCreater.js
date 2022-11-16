const User = require("../src/model/user-schema")
const Task = require("../src/model/taskList")

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
module.exports = async(id, date) =>{ 
  const listId = id + date
  let doc = await Task.findOne({"listId" : listId})
  // console.log(doc)
  if(!doc){
    console.log("We are creating new list.")
    doc = await new Task({
      listId :listId,
      tasks : [task1, task2, task3]
    }).save()
  } else {
    console.log("we are get some data in docs")
  }
  return doc;
}