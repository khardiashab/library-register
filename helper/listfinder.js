const User = require("../src/model/user-schema")
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
    // console.log("This is from listfinder.js/ date: ", date)

    let query = {"_id": id, "dailyList.day" : date}
    let select = {"dailyList.$" : 1}
    let list = await User.findOne(query, select)
    // console.log("This is from listfinder.js/ list: ", list)
    
    // let make a object of every day
    let obj = {
      date : date.slice(0,7),
      list : list ? list.dailyList[0] : list
    }
    // push the element in arr 
    // console.log("This is from the listfinder.js : ", obj)
    arr.push(obj)
  }
  return arr;
}
