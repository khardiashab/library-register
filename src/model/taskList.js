const mongoose = require("mongoose")

const task = mongoose.Schema({
  name : String,
  done : {
    type : Boolean,
    default : false,
  }
})

const schema = mongoose.Schema({
  listId : {
    type : String,
    required : true, 
    unique : true,
  }, 
  tasks : [task]
})

module.exports = mongoose.model("tasklist", schema)