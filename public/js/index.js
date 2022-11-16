const checkBoxes = document.querySelectorAll(".check-box")

document.addEventListener("DOMContentLoaded", ()=>{
  checkBoxes.forEach(ele => {
    if(ele.getAttribute("data-task-completed")=== "true"){
      ele.checked = true
      ele.setAttribute("onclick", "return false")
    }
  })
})