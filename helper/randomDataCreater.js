const dateChanger = require("./dateTypeChanger")
const User = require("../src/model/user-schema")

const task1 = {
  name: "Welcome to your Todo List.",
  done: false
}
const task2 = {
  name: "<--Click here After completing it.",
  done: false
}
const task3 = {
  name: "To delete the task click here -->",
  done: false
}
const task4 = {
  name: "Welcome to your Todo List.",
  done: true
}
const task5 = {
  name: "<--Click here After completing it.",
  done: false
}
const task6 = {
  name: "To delete the task click here -->",
  done: true,
}

function random(arr) {
  return Math.floor(Math.random() * (arr))
}

const d = new Date();
const ar = []
let i = 20
const arr = []
while (i-- > 0) {
  d.setDate(d.getDate() - 1)
  arr.push(dateChanger(d))
}
const present = [true, false]
const dayTask = [task1, task2, task3, task4, task5, task6]

const id = "10593008616691538142"



module.exports = async() =>{
  let doc = await User.findById("6379b146702a53b59391dd48")
  const dailyList = []
  for (let i = 0; i < arr.length; i++) {
    let daily =
      {
        day: arr[i],
        present: present[random(2)],
        taskList: dayTask
      }
  
    dailyList.push(daily) 
  }
  doc.dailyList = dailyList
  await doc.save()
}
