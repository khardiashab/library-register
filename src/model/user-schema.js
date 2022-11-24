const mongoose = require("mongoose")




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
  }
})

module.exports = mongoose.model("USER", schema)