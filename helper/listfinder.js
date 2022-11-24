const User = require("../src/model/daily-list-schema")
const dateChanger = require("./dateTypeChanger")

// make an array of last fiften day 
let d = new Date();
const ar = []
let i = 15
const arr = []
module.exports = async(id)=>{
  while (i-- > 0) {
    d.setDate(d.getDate() - 1)
    let date = dateChanger(d)
    let listId = id + date
    // console.log("This is from listfinder.js/ date: ", date)

    let query = {"listId" : listId}
    let select = {}
    let list = await User.findOne(query, select)
    // console.log("This is from listfinder.js/ list: ", list)
    
    // let make a object of every day
    let obj = {
      date : date.slice(0,7),
      list : list 
    }
    // push the element in arr 
    // console.log("This is from the listfinder.js : ", obj)
    arr.push(obj)
  }
  // console.log(arr)
  return arr
}
