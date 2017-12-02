import { allItemsSelector } from '../allItems.selectors'

describe('allItemsSelector', () => {
  it('returns most recently added version of each item', () => {
    const dummyState = {
      dates: {
        [0]: { items: [{
          item: 'item1', cost: 1, calories: 100 }, {
          item: 'item2', cost: 1, calories: 100 }, {
          item: 'item3', cost: 1, calories: 100 }]
        },
        [1]: { items: [{
          item: 'item4', cost: 1, calories: 100 }, {
          item: 'item5', cost: 1, calories: 100 }, {
          item: 'item5', cost: 1, calories: 100 }, {
          item: 'item6', cost: 1, calories: 100 }]
        },
        [2]: { items: [{
          item: 'item1', cost: 2, calories: 300 }, {
          item: 'item4', cost: 2, calories: 300 }, {
          item: 'item3', cost: 2, calories: 300 }, {
          item: 'item3', cost: 2, calories: 300 }]
        }
      }
    }

    const result = allItemsSelector(dummyState)

    expect(result).toEqual([
      { item: 'item1', cost: 1, calories: 100 },
      { item: 'item1', cost: 2, calories: 300 },
      { item: 'item2', cost: 1, calories: 100 },
      { item: 'item3', cost: 1, calories: 100 },
      { item: 'item3', cost: 2, calories: 300 },
      { item: 'item4', cost: 1, calories: 100 },
      { item: 'item4', cost: 2, calories: 300 },
      { item: 'item5', cost: 1, calories: 100 },
      { item: 'item6', cost: 1, calories: 100 }
    ])
  })
})