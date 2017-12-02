import { todaysItemsSelector, totalsSelector } from '../items.selectors'

describe('todaysItemsSelector', () => {
  it('selects only items from selectedDate', () => {
    const state = {
      dates: {
        [1]: { items: [1, 2, 3] },
        [2]: { items: [4, 5, 6] }
      },
      selectedDate: 2
    }

    const result = todaysItemsSelector(state)

    expect(result).toEqual([4,5,6])
  })

  it('selects empty array if date not found', () => {
    const state = {
      dates: {
      },
      selectedDate: 2
    }

    const result = todaysItemsSelector(state)

    expect(result).toEqual([])
  })
})

describe('totalsSelector', () => {
  it('selects totals of cost and calories for selectedDate', () => {
    const state = {
      dates: {
        [1]: {
          items: [
            { cost: 0.25, calories: 4 },
            { cost: 0.66, calories: 3 },
            { cost: 0.35, calories: 15.5 },
            { cost: 1.3, calories: 0.25 }
          ]
        }
      },
      selectedDate: 1
    }

    const result = totalsSelector(state)

    expect(result).toEqual({
      cost: 2.56,
      calories: 22.75
    })
  })
})