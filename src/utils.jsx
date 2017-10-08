export const dateIndex = date => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

export const mapUnique = (array, prop) =>
  Array.from(new Set(array.map(element => element[prop])))
    .map(uniqueValueOfProp =>
      array.filter(element => element[prop] === uniqueValueOfProp)[0])