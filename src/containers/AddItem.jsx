import React from 'react'
import { connect } from 'react-redux'

import { SET_NEW_ITEM_PROPERTY, ADD_NEW_ITEM, createAddNewItem } from '../actions'
import AddItemForm from '../components/AddItemForm'
import type { Item } from '../models/item'

const mapStateToProps = state => ({
  ...(state.itemToBeAdded),
  selectedDate: state.selectedDate
})

const mapDispatchToProps = dispatch => ({
  onChangeField: (key, value) => dispatch({
    type: SET_NEW_ITEM_PROPERTY,
    key,
    value
  }),
  onClickAddItem: (date, itemToBeAdded) =>
    createAddNewItem(date, itemToBeAdded)(dispatch)
})

type Props = Item | {
  selectedDate: Date,

  onChangeField: Function,
  onClickAddItem: Function
}

const Component = ({
  item,
  cost,
  calories,

  selectedDate,

  onChangeField,
  onClickAddItem
}: Props) =>
  <AddItemForm {
    ...{
      item,
      cost,
      calories,

      onChangeField,
      onClickAddItem: () => onClickAddItem(selectedDate, { item, cost, calories })
    }}
  />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)