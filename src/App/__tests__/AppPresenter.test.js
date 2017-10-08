import AppModel from '../AppModel'
import AppPresenter from '../AppPresenter'
import { dateIndex } from '../../utils'

describe('AppPresenter', () => {
  describe('todaysItems', () => {
    const todaysDate = new Date()
    const tomorrowsDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 1)

    it('returns the items for the selected date from the model', () => {
      const model = new AppModel()
      const presenter = new AppPresenter(model)
      model.dates = {
        [dateIndex(todaysDate)]: {
          items: [{ item: 'Sardines', cost: 1.5, calories: 200 }]
        },
        [dateIndex(tomorrowsDate)]: {
          items: [{ item: 'Yogurt', cost: 2, calories: 180 }]
        }
      }
      
      const result = presenter.todaysItems()

      expect(result).toEqual(
        [{ item: 'Sardines', cost: '1.5', calories: 200 }]
      )
    })

    it('removes trailing 0 from decimal-only costs', () => {
      const model = new AppModel()
      const presenter = new AppPresenter(model)

      model.dates = {
        [dateIndex(todaysDate)]: {
          items: [{ item: '', cost: 0.5, calories: 200 }]
        }
      }
      
      const result = presenter.todaysItems()

      expect(result).toEqual(
        [{ item: '', cost: '.5', calories: 200 }]
      )
    })

    it('gracefully returns an empty array for the selected date from the model if any part of the model doesn\'t exist', () => {
      const model = new AppModel()
      expect(new AppPresenter(model).todaysItems()).toEqual([])

      model.dates = {}
      expect(new AppPresenter(model).todaysItems()).toEqual([])

      model.dates[dateIndex(model.selectedDate)] = {}
      expect(new AppPresenter(model).todaysItems()).toEqual([])
      
      model.dates[dateIndex(model.selectedDate)].items = null
      expect(new AppPresenter(model).todaysItems()).toEqual([])
    })
  })

  describe('totalOfColumn', () => {
    it('returns the total of the given column for the items in the model', () => {
      const presenter = new AppPresenter()
      
      const result =
        presenter.totalOfColumn([
          { fakeColumn: 1.5, otherColumn: 2 },
          { fakeColumn: 3,   otherColumn: 1 }
        ], 'fakeColumn')

      expect(result).toEqual(4.5)
    })

    it('rounds any total over 2 decimal places to 2 decimal places', () => {
      const presenter = new AppPresenter()
      
      const result =
        presenter.totalOfColumn([
          { fakeColumn: 0.05 },
          { fakeColumn: 0.025 }
        ], 'fakeColumn')

      expect(result).toEqual(0.07)
    })

    it('cleans non-numeric values to zero', () => {
      const presenter = new AppPresenter()
      
      const result =
        presenter.totalOfColumn([
          { fakeColumn: 0.05 },
          { fakeColumn: '' }
        ], 'fakeColumn')

      expect(result).toEqual(0.05)
    })
  })

  describe('onChangeFieldValue', () => {
    it('returns a function which sets the given property to the value of the event target it\'s passed', () => {
      let model = new AppModel()
      const presenter = new AppPresenter(model, newModel => model = newModel)
      const mockEvent = {
        target: {
          value: 'a'
        }
      }

      presenter.onChangeFieldValue('item')(mockEvent)

      expect(model.newExpense.item).toEqual('a')
    })
  })

  describe('onAddExpense', () => {
    const testOnAddExpenseWithModel = (model) => {
      model.newExpense.item = 'aa'
      model.newExpense.cost = '1'
      model.newExpense.calories = 2

      const presenter = new AppPresenter(model, newModel => Object.assign(model, newModel))

      presenter.onAddExpense()

      const firstItemInModel = model.dates[dateIndex(model.selectedDate)].items[0]
      expect(firstItemInModel.item).toEqual('aa')
      expect(firstItemInModel.cost).toEqual(1)
      expect(firstItemInModel.calories).toEqual(2)

      expect(model.newExpense.item).toEqual('')
      expect(model.newExpense.cost).toEqual('')
      expect(model.newExpense.calories).toEqual('')
    }

    it('adds the given expense to the list of expenses for the current date, creating properties as needed', () => {
      const model = new AppModel()
      
      model.dates = {}
      testOnAddExpenseWithModel(model)

      model.dates = { [dateIndex(model.selectedDate)]: {} }
      testOnAddExpenseWithModel(model)

      model.dates = { [dateIndex(model.selectedDate)]: { items: null } }
      testOnAddExpenseWithModel(model)

      model.dates = { [dateIndex(model.selectedDate)]: { items: [] } }
      testOnAddExpenseWithModel(model)
    })

    it('uses 0 if blank values are passed', () => {
      const model = new AppModel()

      model.newExpense.item = 'a'
      model.newExpense.cost = ''
      model.newExpense.calories = ''

      const presenter = new AppPresenter(model, newModel => Object.assign(model, newModel))

      presenter.onAddExpense()

      const firstItemInModel = model.dates[dateIndex(model.selectedDate)].items[0]
      expect(firstItemInModel.item).toEqual('a')
      expect(firstItemInModel.cost).toEqual(0)
      expect(firstItemInModel.calories).toEqual(0)

      expect(model.newExpense.item).toEqual('')
      expect(model.newExpense.cost).toEqual('')
      expect(model.newExpense.calories).toEqual('')
    })
  })

  describe('onGoBackOneDay', () => {
    it('sets selectedDate back by one day', () => {
      const model = new AppModel()
      model.selectedDate = new Date(2017, 8, 8)

      const presenter = new AppPresenter(model, newModel => Object.assign(model, newModel))
      presenter.onGoBackOneDay()

      expect(dateIndex(model.selectedDate)).toEqual(dateIndex(new Date(2017, 8, 7)))
    })
  })

  describe('onGoForwardOneDay', () => {
    it('sets selectedDate forward by one day', () => {
      const model = new AppModel()
      model.selectedDate = new Date(2017, 8, 8)

      const presenter = new AppPresenter(model, newModel => Object.assign(model, newModel))
      presenter.onGoForwardOneDay()

      expect(dateIndex(model.selectedDate)).toEqual(dateIndex(new Date(2017, 8, 9)))
    })
  })

  describe('onDeleteExpense', () => {
    it('removes the expense at the specified index from the list of expenses', () => {
      const model = new AppModel()
      model.dates[dateIndex(new Date())] = { items: [ { item: '1' }, { item: '2' }, { item : '3' } ] }

      const presenter = new AppPresenter(model, newModel => Object.assign(model, newModel))
      presenter.onDeleteExpense(1)()

      expect(model.dates[dateIndex(new Date())].items.map(i => i.item).join(',')).toEqual('1,3')
    })
  })

  describe('recentUniqueExpenses', () => {
    it('returns the last 20 unique expenses in reverse-order of date/time, alphabetized', () => {
      const model = new AppModel()
      model.dates[dateIndex(new Date(2017, 5, 20))] = { items: [ { item: 'A' }, { item: 'B' }, { item: 'C' } ] }
      model.dates[dateIndex(new Date(2017, 5, 19))] = { items: [ { item: 'D' }, { item: 'A' }, { item: 'B' } ] }
      model.dates[dateIndex(new Date(2017, 5, 16))] = { items: [ { item: 'E' }, { item: 'A' }, { item: 'A' } ] }
      model.dates[dateIndex(new Date(2017, 5, 10))] = { items: [ { item: 'A' }, { item: 'F' }, { item: 'A' } ] }
      model.dates[dateIndex(new Date(2017, 4, 20))] = { items: [ { item: 'A' }, { item: 'A' }, { item: 'G' } ] }
      model.dates[dateIndex(new Date(2017, 3, 20))] = { items: [ { item: 'A' }, { item: 'H' }, { item: 'A' } ] }
      model.dates[dateIndex(new Date(2017, 2, 20))] = { items: [ { item: 'P' }, { item: 'A' }, { item: 'A' } ] }
      model.dates[dateIndex(new Date(2017, 1, 20))] = { items: [ { item: 'A' }, { item: 'J' }, { item: 'A' } ] }
      model.dates[dateIndex(new Date(2017, 1, 19))] = { items: [ { item: 'A' }, { item: 'A' }, { item: 'K' } ] }
      model.dates[dateIndex(new Date(2017, 1, 18))] = { items: [ { item: 'L' }, { item: 'M' }, { item: 'N' } ] }
      model.dates[dateIndex(new Date(2017, 1, 17))] = { items: [ { item: 'O' }, { item: 'I' }, { item: 'Q' } ] }
      model.dates[dateIndex(new Date(2017, 1, 16))] = { items: [ { item: 'R' }, { item: 'S' }, { item: 'T' } ] }

      const presenter = new AppPresenter(model)

      const result = presenter.recentUniqueExpenses(20)

      expect(result.map(r => r.item).join(',')).toEqual('A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T')
    })
  })

  describe('onPopulateRecentExpense', () => {
    it('populates expenses with specific recent expense', () => {
      const model = new AppModel()
      const presenter = new AppPresenter(model, newModel => Object.assign(model, newModel))

      model.newExpense.item = 'aa'
      model.newExpense.cost = 1
      model.newExpense.calories = 2

      presenter.onPopulateRecentExpense({
        item: 'A',
        cost: 1,
        calories: 2
      })()

      const firstItemInModel = model.dates[dateIndex(model.selectedDate)].items[0]
      expect(firstItemInModel.item).toEqual('A')
      expect(firstItemInModel.cost).toEqual(1)
      expect(firstItemInModel.calories).toEqual(2)
    })
  })
})

