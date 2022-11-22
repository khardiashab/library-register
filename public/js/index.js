// /list.ejs completeing  task checkbox start here
const checkBoxes = document.querySelectorAll(".check-box")

document.addEventListener("DOMContentLoaded", ()=>{
  checkBoxes.forEach(ele => {
    if(ele.getAttribute("data-task-completed")=== "true"){
      ele.checked = true
      ele.setAttribute("onclick", "return false")
    }
  })
})
// /list.ejs completeing  task checkbox end here


// persent form submitting start here
const presentBtn = document.querySelector("#present-btn")
const longitudeInput = document.querySelector("#longitude-input")
const latitudeInput = document.querySelector("#latitude-input")
const err_location = document.querySelector("#err_location")
const presentForm = document.querySelector("#present-form") 

presentForm.addEventListener("submit", async(e) => {
  // e.defaultPrevented();
  e.preventDefault();
  if(navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition( (position)=> {
      const { latitude, longitude } = position.coords
      longitudeInput.setAttribute("value", longitude )
      latitudeInput.setAttribute("value", latitude )
      presentForm.submit()
      
    })
  } else {
    err_location.setAttribute("value", "This browser not sported the location.")
    presentForm.submit()
  }
  
})

// persent form submitting ends here