module.exports = (date) =>{
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return date.toLocaleString("en-uk", options)
}