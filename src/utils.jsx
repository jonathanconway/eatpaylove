export const dateIndex = date =>
  `${date.getFullYear()}-${date.getMonth().toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`

export const mapUnique = (array, prop) =>
  Array.from(new Set(array.map(element => element[prop])))
    .map(uniqueValueOfProp =>
      array.filter(element => element[prop] === uniqueValueOfProp)[0])