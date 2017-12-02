import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import MyItems from '../MyItems'
jest.mock('../../components/ItemsList', () => jest.fn())
import ItemsList from '../../components/ItemsList'
import { emptyMockFn } from '../../utils'

describe('<MyItems />', () => {
  it('renders <ItemsList> with props', () => {
    const dummyState = { dates: { [1]: { items: [1,2,3] } }, selectedDate: 1 }
    const stubbedReducer = state => state
    const store = createStore(stubbedReducer, dummyState)

    emptyMockFn(ItemsList).mockReturnValueOnce(<b></b>)
    
    const wrapper = mount(
      <Provider store={store}>
        <MyItems />
      </Provider>)

    expect(ItemsList).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [1,2,3]
      }),
      expect.any(Object))
  })

  it('dispatches DELETE_ITEM on onDeleteItem', () => {
    const dummyState = {}
    const mockedReducer = jest.fn(() => ({ dates: {}, selectedDate: 1 }))
    const store = createStore(mockedReducer, dummyState)

    emptyMockFn(ItemsList)
      .mockImplementation(({ onDeleteItem }) =>
        <button onClick={() => onDeleteItem(0)}></button>)
    
    const wrapper = mount(
      <Provider store={store}>
        <MyItems />
      </Provider>)

    wrapper.find('button').simulate('click')

    expect(mockedReducer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'DELETE_ITEM',
        date: 1,
        itemIndex: 0
      }))
  })
})