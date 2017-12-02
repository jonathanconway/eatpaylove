// import type { Item } from './models/item'
import {
  DELETE_ITEM,
  SET_NEW_ITEM_PROPERTY,
  ADD_NEW_ITEM,
  CLEAR_ITEM_TO_BE_ADDED,
  SET_SELECTED_DATE_PREVIOUS_DAY,
  SET_SELECTED_DATE_NEXT_DAY
} from './actions'
import { dateIndex } from './utils'

const defaultState: any = {
  dates: {},
  selectedDate: dateIndex(new Date()),
  itemToBeAdded: {
    item: '',
    cost: 0,
    calories: 0
  }
}

export default (state: any = defaultState, action: any = {}): any => {
  switch (action.type) {
    case DELETE_ITEM:
      return {
        ...state,
        dates: {
          ...(state.dates),
          [action.date]: {
            ...(state.dates[action.date]),
            items:
              state
                .dates[action.date]
                .items
                .filter((item, itemIndex) =>
                  itemIndex !== action.itemIndex)
          }
        }
      }
    case SET_NEW_ITEM_PROPERTY:
      return {
        ...state,
        itemToBeAdded: {
          ...(state.itemToBeAdded),
          [action.key]: action.value
        }
      }
    case ADD_NEW_ITEM:
      return {
        ...state,
        dates: {
          ...(state.dates),
          [action.dateIndex]: {
            ...(state.dates[action.dateIndex]),
            items:
              ((state.dates[action.dateIndex] || {}).items || [])
                .concat(action.itemToBeAdded)
          }
        }
      }
    case CLEAR_ITEM_TO_BE_ADDED:
      return {
        ...state,
        itemToBeAdded: defaultState.itemToBeAdded
      }
    case SET_SELECTED_DATE_PREVIOUS_DAY:
      {
        const selectedDate = new Date(state.selectedDate)
        selectedDate.setDate(selectedDate.getDate() - 1)
        return {
          ...state,
          selectedDate: dateIndex(selectedDate)
        }
      }
    case SET_SELECTED_DATE_NEXT_DAY:
      {
        const selectedDate = new Date(state.selectedDate)
        selectedDate.setDate(selectedDate.getDate() + 1)
        return {
          ...state,
          selectedDate: dateIndex(selectedDate)
        }
      }
    default:
      return state
  }
}