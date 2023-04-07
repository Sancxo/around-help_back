function readDate(date: Date | string) {
  date = typeof date === "string" ? new Date(date) : date;
  return `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`
}

function readDateTime(datetime: Date | string) {
  datetime = typeof datetime === "string" ? new Date(datetime) : datetime;
  return `${datetime.getFullYear()} ${datetime.getMonth()} ${datetime.getDate()}, at: ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`
}

export { readDate, readDateTime }