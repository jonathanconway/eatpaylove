import type { Item } from './models/item'

export const DELETE_ITEM                    = 'DELETE_ITEM'
export const SET_NEW_ITEM_PROPERTY          = 'SET_NEW_ITEM_PROPERTY'
export const ADD_NEW_ITEM                   = 'ADD_NEW_ITEM'
export const CLEAR_ITEM_TO_BE_ADDED         = 'CLEAR_ITEM_TO_BE_ADDED'
export const SET_SELECTED_DATE_PREVIOUS_DAY = 'SET_SELECTED_DATE_PREVIOUS_DAY'
export const SET_SELECTED_DATE_NEXT_DAY     = 'SET_SELECTED_DATE_NEXT_DAY'

export const createAddNewItem = (dateIndex: Number, itemToBeAdded: Item) => (dispatch: Function) => {
  dispatch({
    type: ADD_NEW_ITEM,
    dateIndex,
    itemToBeAdded
  })
  dispatch({
    type: CLEAR_ITEM_TO_BE_ADDED
  })
}