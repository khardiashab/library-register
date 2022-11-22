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



const schema = mongoose.Schema({
  googleId :String,
  profile : {
    name : String,
    email : String,
    pictureUrl : String,
    age : {
      type :Number,
    },
    gender : {
      type : String,
    }
  },
  library : {
    name :{
      type : String,
    } ,
    longitude :{
      type : Number,
    },
    latitude : {
      type : Number,
    },
  },
  dailyList : {
    type : [dailyListSchema],
    default : []
  }
})

module.exports = mongoose.model("USER", schema)