import { dateIndex, mapUnique } from '../utils'
import { Presenter } from '../mcp'

import { Expense } from './AppModel'

export default class AppPresenter extends Presenter {
  /** Utils **/

  trimFloat = (input) =>
    input.split('.')[0] +
    (input.split('.')[1] ? ('.'  + input.split('.')[1].substr(0, 2)) : '')

  totalOfColumn = (items, columnName) =>
    parseFloat(
      this.trimFloat(
        items
          .map(item => item[columnName])
          .reduce((value1, value2) => this.cleanNumber(value1) + this.cleanNumber(value2))
          .toString()))

  clearProperties = object => {
    for (var key in object) {
      object[key] = null
    }
  }

  /** Methods **/

  removeLeadingZeroes = inputString =>
    inputString.indexOf('0') === 0
      ? inputString.substr(1)
      : inputString

  formatItem = item => Object.assign(item, {
      cost: this.removeLeadingZeroes(parseFloat(item.cost).toString())
    })

  todaysItems = () =>
    (((this.model.dates || {})[dateIndex(new Date(this.model.selectedDate))] || {}).items || [])
      .map(this.formatItem)

  onChangeFieldValue = field => event =>
    this.setModel({
      newExpense: Object.assign(this.model.newExpense, {
        [field]: event.target.value
      })
    })

  cleanNumber = number =>
    parseFloat(number === ''
      ? 0
      : (isNaN(number)
        ? 0
        : number))

  cleanExpense = expense =>
    ({
      ...expense,
      cost: this.cleanNumber(expense.cost),
      calories: this.cleanNumber(expense.calories)
    })

  onAddExpense = () => {
    return this.setModel({
      dates: {
        ...this.model.dates,
        [dateIndex(this.model.selectedDate)]: {
          items: [
            ...this.todaysItems(),
            this.cleanExpense(this.model.newExpense)
          ]
        }
      },
      newExpense: new Expense()
    })
  }

  onGoBackOneDay = () =>
    this.setModel({
      selectedDate: new Date(
        this.model.selectedDate.getFullYear(),
        this.model.selectedDate.getMonth(),
        this.model.selectedDate.getDate() - 1)
    })

  onGoForwardOneDay = () =>
    this.setModel({
      selectedDate: new Date(
        this.model.selectedDate.getFullYear(),
        this.model.selectedDate.getMonth(),
        this.model.selectedDate.getDate() + 1)
    })

  /**
   * Deletes an expense from the list
   *
   * @string indexToDelete - index of expense to delete
   */
  onDeleteExpense = (indexToDelete) => () =>
    this.setModel({
      dates: Object.assign(this.model.dates, {
        [dateIndex(this.model.selectedDate)]: {
          items: this.todaysItems().filter((item, index) => index !== indexToDelete)
        }
      })
    })

  arrayOrDefault = (array, defaultIfEmpty) => array.length === 0 ? defaultIfEmpty : array

  recentUniqueExpenses = limit =>
    mapUnique(
      this.arrayOrDefault(
        Object.keys(this.model.dates)
          .sort()
          .reverse()
          .map(key => this.model.dates[key].items), [[]])
        .reduce((items1, items2) => items1.concat(items2)), 'item')
        .sort((item1, item2) => item1.item < item2.item ? -1 : 1 )
        .slice(0, limit)


  onPopulateRecentExpense = recentExpense => () =>
    this.setModel({
      dates: Object.assign(this.model.dates, {
        [dateIndex(this.model.selectedDate)]: {
          items: this.todaysItems().concat([recentExpense])
        }
      })
    })

  getBulletFormattedDate = date =>
    `${date.getDate().toString().padStart(2, 0)}•${(date.getMonth() + 1).toString().padStart(2, 0)}`

  getSelectedYear = date =>
    date.getFullYear().toString()

}