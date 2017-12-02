import React from 'react'
import { connect } from 'react-redux'

import DateControls from '../components/DateControls'
import { SET_SELECTED_DATE_NEXT_DAY, SET_SELECTED_DATE_PREVIOUS_DAY } from '../actions'

const mapStateToProps = state => ({
  selectedDate: state.selectedDate
})

const mapDispatchToProps = dispatch => ({
  onGoBackwardOneDay: () => dispatch({
    type: SET_SELECTED_DATE_PREVIOUS_DAY
  }),
  onGoForwardOneDay: () => dispatch({
    type: SET_SELECTED_DATE_NEXT_DAY
  })
})

type Props = {
  selectedDate: String,

  onGoForwardOneDay: Function,
  onGoBackwardOneDay: Function
}

const Component = ({
  selectedDate,

  onGoBackwardOneDay,
  onGoForwardOneDay
}: Props) =>
  <DateControls
    {...{
      selectedDate: new Date(selectedDate),
      onGoBackwardOneDay,
      onGoForwardOneDay
    }}
  />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)