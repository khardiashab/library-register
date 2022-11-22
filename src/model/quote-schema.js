const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuoteSchema = Schema({
  quote : {
    type : String,
    default : "Love Yourself."
  }
})

const Quote = mongoose.model("Quote", QuoteSchema)
new Quote({
  quote : "Believe in Yourself, You can do anything. In this thing that you are doing, you are the best."
}).save()

module.exports = Quote
