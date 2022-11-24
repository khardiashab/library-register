const dateChanger = require("./dateTypeChanger")
const dailyList = require("../src/model/daily-list-schema")


function random(arr) {
  return Math.floor(Math.random() * (arr))
}

const present = [true, false]
const task1 = {
  name: "Welcome to your Todo List.",
  done: present[random(2)]
}
const task2 = {
  name: "<--Click here After completing it.",
  done: present[random(2)]
}
const task3 = {
  name: "To delete the task click here -->",
  done: present[random(2)]
}
const task4 = {
  name: "Welcome to your Todo List.",
  done: present[random(2)]
}
const task5 = {
  name: "<--Click here After completing it.",
  done: present[random(2)]
}
const task6 = {
  name: "To delete the task click here -->",
  done: present[random(2)],
}
const id = "105930086166915381421"
const d = new Date();
list = []
let i = 20
const arr = []
const dayTask = [task1, task2, task3, task4, task5, task6]
while (i-- > 0) {
  d.setDate(d.getDate() - 1)
  let day = dateChanger(d)
  let listId = id + day
  let obj = {
    listId :listId,
    day : day,
    present :present[random(2)],
    taskList : dayTask
  }
  list.push(obj)
}

module.exports = async ()=>{
  await dailyList.insertMany(list);
}




