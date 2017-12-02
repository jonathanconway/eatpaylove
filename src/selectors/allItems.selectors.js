import { createSelector } from 'reselect'

// const mergeItems = (accumulator, items) =>
//   items.filter(item =>
//     accumulator.filter(accumulatorItem =>
//       accumulatorItem.item === item ))

// export const frequentItemsSelector = ({ dates }) =>
//   Object.keys(dates)
//     .map(date => dates[date].items
//       .map(item => ({ ...item, date })))
//     .reduce((accumulator, items) => accumulator.concat(items), [])

export const allItemsSelector = ({ dates }) =>
  Object.keys(dates)
    .map(date => dates[date].items)
    .reduce((accumulator, items) => accumulator.concat(items), [])
    .reduce((accumulator, item) =>
      accumulator.some(accItem => JSON.stringify(accItem) === JSON.stringify(item))
        ? accumulator
        : accumulator.concat(item), [])
    .sort((itemA, itemB) => itemA.item > itemB.item)
