import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import SelectDate from '../SelectDate'
jest.mock('../../components/DateControls', () => jest.fn())
import DateControls from '../../components/DateControls'
import { emptyMockFn, dateIndex } from '../../utils'

describe('<SelectDate />', () => {
  it('renders <DateControls> with props', () => {
    const dummyState = {
      selectedDate: 1509667200000
    }
    const store = createStore(state => state, dummyState)

    emptyMockFn(DateControls).mockReturnValueOnce(<b></b>)
    
    const wrapper = mount(
      <Provider store={store}>
        <SelectDate />
      </Provider>)

    expect(DateControls).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedDate: new Date(1509667200000)
      }),
      expect.any(Object))
  })
  
  it('dispatches SET_SELECTED_DATE_PREVIOUS_DAY on onGoBackwardOneDay', () => {
    const dummyState = {
      selectedDate: 1509667200000
    }
    const mockedReducer = jest.fn(() => dummyState)
    const store = createStore(mockedReducer, dummyState)

    emptyMockFn(DateControls)
      .mockImplementation(({ onGoBackwardOneDay }) =>
        <button onClick={onGoBackwardOneDay}></button>)
    
    const wrapper = mount(
      <Provider store={store}>
        <SelectDate />
      </Provider>)

    wrapper.find('button').simulate('click')

    expect(mockedReducer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'SET_SELECTED_DATE_PREVIOUS_DAY'
      }))
  })

  it('dispatches SET_SELECTED_DATE_NEXT_DAY on onGoForwardOneDay', () => {
    const dummyState = {
      selectedDate: 1509667200000
    }
    const mockedReducer = jest.fn(() => dummyState)
    const store = createStore(mockedReducer, dummyState)

    emptyMockFn(DateControls)
      .mockImplementation(({ onGoForwardOneDay }) =>
        <button onClick={onGoForwardOneDay}></button>)
    
    const wrapper = mount(
      <Provider store={store}>
        <SelectDate />
      </Provider>)

    wrapper.find('button').simulate('click')

    expect(mockedReducer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'SET_SELECTED_DATE_NEXT_DAY'
      }))
  })
})