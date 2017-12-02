import React from 'react'
import { connect } from 'react-redux'

import QuickPickList from '../components/QuickPickList'
import { allItemsSelector } from '../selectors/allItems.selectors'

const mapStateToProps = state => ({
  items: allItemsSelector(state),
  selectedDate: state.selectedDate
})

const mapDispatchToProps = dispatch => ({
  onClickItem: (dateIndex, itemToBeAdded) => dispatch({
    type: 'ADD_NEW_ITEM',
    dateIndex,
    itemToBeAdded
  })
})

type Props = {
  items: Array<object>,
  selectedDate: Date,

  onClickItem: Function
}

const Component = ({
  selectedDate,
  items,

  onClickItem
}: Props) =>
  <QuickPickList
    {...{ items }}
    onClickItem={item => onClickItem(selectedDate, item)}
  />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)