import reducer from '../reducer'
import {
  DELETE_ITEM,
  SET_NEW_ITEM_PROPERTY,
  ADD_NEW_ITEM,
  CLEAR_ITEM_TO_BE_ADDED,
  SET_SELECTED_DATE_PREVIOUS_DAY,
  SET_SELECTED_DATE_NEXT_DAY
} from '../actions'

describe('reducer', () => {
  it('returns state passed in', () => {
    const state = {
      dates: {
        [1]: {
          items: [1, 2]
        }
      },
      selectedDate: 1,
      itemToBeAdded: {
        item: '',
        cost: 0,
        calories: 0
      }
    }

    expect(reducer(state)).toEqual(state)
  })

  describe(DELETE_ITEM, () => {
    it('deletes the specified item from the specified date', () => {
      const state = {
        dates: {
          [1]: {
            items: [1, 2]
          }
        },
        selectedDate: 1,
        itemToBeAdded: {
          item: '',
          cost: 0,
          calories: 0
        }
      }

      const result = reducer(state, {
        type: DELETE_ITEM,
        itemIndex: 0,
        date: 1
      })

      expect(result.dates[1].items).toEqual([2])
    })
  })

  describe(SET_NEW_ITEM_PROPERTY, () => {
    it('sets the specified property on itemToBeAdded to the specified value', () => {
      const state = {
        dates: {
        },
        selectedDate: 0,
        itemToBeAdded: {
          item: '',
          cost: 0,
          calories: 0
        }
      }

      const result = reducer(state, {
        type: SET_NEW_ITEM_PROPERTY,
        key: 'item',
        value: 'Test'
      })

      expect(result.itemToBeAdded.item).toEqual('Test')
    })
  })

  describe(ADD_NEW_ITEM, () => {
    it('adds itemToBeAdded to the items list of the specified date', () => {
      const state = {
        dates: {
          [0]: {
            items: [1,2,3]
          },
          [1]: {
            items: [4,5,6]
          }
        },
        selectedDate: 1
      }

      const result = reducer(state, {
        type: ADD_NEW_ITEM,
        dateIndex: 1,
        itemToBeAdded: {
          item: 'New',
          cost: 1,
          calories: 1
        }
      })

      expect(result.dates[1].items).toEqual([
        4, 5, 6, {
          item: 'New',
          cost: 1,
          calories: 1
        }
      ])
    })
  })

  describe(CLEAR_ITEM_TO_BE_ADDED, () => {
    it('return itemToBeAdded to its pristine state', () => {
      const state = {
        dates: {},
        selectedDate: 0,
        itemToBeAdded: {
          item: 'New',
          cost: 1,
          calories: 1
        }
      }

      const result = reducer(state, {
        type: CLEAR_ITEM_TO_BE_ADDED
      })

      expect(result.itemToBeAdded).toEqual({
        item: '',
        cost: 0,
        calories: 0
      })
    })
  })

  describe(SET_SELECTED_DATE_PREVIOUS_DAY, () => {
    it('return itemToBeAdded to its pristine state', () => {
      const state = {
        dates: {},
        selectedDate: 1509667200000,
        itemToBeAdded: {
          item: '',
          cost: 0,
          calories: 0
        }
      }

      const result = reducer(state, {
        type: SET_SELECTED_DATE_PREVIOUS_DAY
      })

      expect(result).toEqual(expect.objectContaining({
        selectedDate: 1509580800000
      }))
    })
  })
  
  describe(SET_SELECTED_DATE_NEXT_DAY, () => {
    it('return itemToBeAdded to its pristine state', () => {
      const state = {
        dates: {},
        selectedDate: 1509667200000,
        itemToBeAdded: {
          item: '',
          cost: 0,
          calories: 0
        }
      }

      const result = reducer(state, {
        type: SET_SELECTED_DATE_NEXT_DAY
      })

      expect(result).toEqual(expect.objectContaining({
        selectedDate: 1509753600000
      }))
    })
  })
})