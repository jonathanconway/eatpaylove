export class Expense {
  item = ''
  cost =  ''
  calories = ''
}

export default class AppModel {
  constructor(selectedDate, dates) {
    this.selectedDate = selectedDate || new Date()
    this.dates = dates || {}
  }

  newExpense = new Expense()
}
