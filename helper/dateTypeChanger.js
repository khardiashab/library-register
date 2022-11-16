module.exports = (date) =>{
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleString("en-uk", options)
}