import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import AddItem from '../AddItem'
jest.mock('../../components/AddItemForm', () => jest.fn())
import AddItemForm from '../../components/AddItemForm'
import { emptyMockFn } from '../../utils'

jest.mock('../../actions', () => ({
  DELETE_ITEM: 'DELETE_ITEM',
  SET_NEW_ITEM_PROPERTY: 'SET_NEW_ITEM_PROPERTY',
  ADD_NEW_ITEM: 'ADD_NEW_ITEM',
  CLEAR_ITEM_TO_BE_ADDED: 'CLEAR_ITEM_TO_BE_ADDED',
  createAddNewItem: jest.fn(() => jest.fn())
}))
import { createAddNewItem } from '../../actions'

describe('<AddItem />', () => {
  it('renders <AddItemForm> with props', () => {
    const store = createStore(state => state, {
      itemToBeAdded: {
        item: 'item',
        cost: 1,
        calories: 20
      }
    })

    emptyMockFn(AddItemForm).mockReturnValueOnce(<b></b>)
    
    const wrapper = mount(
      <Provider store={store}>
        <AddItem />
      </Provider>)

    expect(AddItemForm).toHaveBeenCalledWith(
      expect.objectContaining({
        item: 'item',
        cost: 1,
        calories: 20
      }),
      expect.any(Object)
    )
  })

  it('dispatches SET_NEW_ITEM_PROPERTY on onChangeField', () => {
    const dummyState = {
      itemToBeAdded: {
        item: '',
        cost: 0,
        calories: 0
      },
      selectedDate: 1
    }
    const mockedReducer = jest.fn(state => state)
    const store = createStore(mockedReducer, dummyState)

    emptyMockFn(AddItemForm)
      .mockImplementation(({ onChangeField }) =>
        <button onClick={() => onChangeField('item', 'value')}></button>)
    
    const wrapper = mount(
      <Provider store={store}>
        <AddItem />
      </Provider>)

    wrapper.find('button').simulate('click')

    expect(mockedReducer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'SET_NEW_ITEM_PROPERTY',
        key: 'item',
        value: 'value'
      }))
  })

  it('calls createAddNewItem action creator on onClickAddItem', () => {
   const dummyState = {
      itemToBeAdded: {
        item: '',
        cost: 0,
        calories: 0
      },
      selectedDate: 1
    }
    
    const store = createStore(state => state, dummyState)

    emptyMockFn(AddItemForm)
      .mockImplementation(({ onClickAddItem }) =>
        <button onClick={onClickAddItem}></button>)
    
    const wrapper = mount(
      <Provider store={store}>
        <AddItem />
      </Provider>)

    wrapper.find('button').simulate('click')

    expect(createAddNewItem).toHaveBeenCalledWith(
      1,
      {
        item: '',
        cost: 0,
        calories: 0
      })
  })
})