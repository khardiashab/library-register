module.exports = (date) =>{
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
  let wd = weekday[date.getDay()]
  let d = date.getDate()
  let m = month[date.getMonth()]
  let y = date.getFullYear()
  let day = wd + ", " + d + " " + m + " "  + y;

  return day
}