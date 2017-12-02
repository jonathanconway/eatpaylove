import React from 'react'
import { connect } from 'react-redux'

import ItemsList from '../components/ItemsList'
import { todaysItemsSelector, totalsSelector } from '../selectors/items.selectors'

const mapStateToProps = state => ({
  items: todaysItemsSelector(state),
  selectedDate: state.selectedDate,
  totals: totalsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onDeleteItem: (date, itemIndex) => dispatch({
    type: 'DELETE_ITEM',
    date,
    itemIndex
  })
})

type Props = {
  items: Array<object>,
  selectedDate: String,
  totals: {
    cost: Number,
    calories: Number
  },

  onDeleteItem: Function
}

const Component = ({
  selectedDate,
  items,
  totals,

  onDeleteItem
}: Props) =>
  <ItemsList
    {...{ items, totals }}
    onDeleteItem={itemIndex => onDeleteItem(selectedDate, itemIndex)}
  />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)