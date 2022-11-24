const mongoose = require("mongoose")

const task = mongoose.Schema({
  name : {
    type : String,
    required : "Enter the task."
  },
  done : {
    type : Boolean,
    default : false,
  }
})
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
let d = new Date()

const dailyListSchema = new mongoose.Schema({
    listId : {
      type : String,
    },
    day : {
      type : String,
    },
    present : {
      type : Boolean,
      default : false
    },
    taskList :{
      type : [task],
      default : [task1, task2, task3]
    }
})

const daily =  mongoose.model("DailyList", dailyListSchema)

module.exports = daily