const dailyList = require("../src/model/daily-list-schema")
const dateChanger = require("./dateTypeChanger")

// make an array of last fiften day 


module.exports = async (req, res, next) =>{
  const arr = []
  let i = 15;
  let d = new Date();
  while(i-- > 0){
    d.setDate(d.getDate() - 1)
    let date = dateChanger(d)
    let listId = req.user.googleId + date
    let list = await dailyList.findOne({"listId" : listId})

    let obj = {
      date : date.slice(0,7),
      list : list 
    }
    // push the element in arr 
    // console.log("This is from the listfinder.js : ", obj)
    arr.push(obj) 
  }

  req.list = arr;
  next()

}
