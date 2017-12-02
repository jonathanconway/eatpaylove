import { createSelector } from 'reselect'

export const todaysItemsSelector = ({dates, selectedDate}) =>
  dates[selectedDate] ? dates[selectedDate].items : []

const totalCostSelector = createSelector(
  todaysItemsSelector,
  items => items.reduce((sumAccumulator, item) => sumAccumulator + item.cost, 0))

const totalCaloriesSelector = createSelector(
  todaysItemsSelector,
  items => items.reduce((sumAccumulator, item) => sumAccumulator + item.calories, 0))

export const totalsSelector = createSelector(
  totalCostSelector,
  totalCaloriesSelector,
  (cost, calories) => ({ cost, calories }))