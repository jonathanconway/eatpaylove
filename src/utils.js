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

export const trimFloat = (input) =>
  input.split('.')[0] +
  (input.split('.')[1] ? ('.'  + input.split('.')[1].substr(0, 2)) : '')

export const sanitizeFloat = number =>
  parseFloat(number === ''
    ? 0
    : (isNaN(number)
      ? 0
      : number))

export const arrayMatchesEvery = (sourceArray, compareArray, compareFn) =>
  sourceArray.every(sourceArrayItem =>
    compareArray.filter(compareArrayItem =>
      compareFn(sourceArrayItem, compareArrayItem)
    ).length === 1)

export const areObjectsEqual = (object1, object2) =>
  JSON.stringify(object1) === JSON.stringify(object2)

export const emptyMockFn = (mockFn: any) => mockFn

export const arrayEqualsArrayAndSome = (sourceArray, compareArray) =>
  compareArray.length > sourceArray.length &&
  JSON.stringify(sourceArray) === JSON.stringify(compareArray.slice(0, sourceArray.length))