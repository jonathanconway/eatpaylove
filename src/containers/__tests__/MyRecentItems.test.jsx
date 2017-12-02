import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import MyRecentItems from '../MyRecentItems'
jest.mock('../../components/QuickPickList', () => jest.fn())
import QuickPickList from '../../components/QuickPickList'
import { emptyMockFn } from '../../utils'

describe('<MyRecentItems />', () => {
  it('renders <QuickPickList> with props', () => {
    const dummyState = {
      dates: {
        [0]: {
          items: [{
              item: 'Item1',
              cost: 1,
              calories: 100
            }, {
              item: 'Item2',
              cost: 2.2,
              calories: 150
            }, {
              item: 'Item3',
              cost: 3.1,
              calories: 400
            }]
        }
      },
      selectedDate: 1509767200000
    }
    const stubbedReducer = state => state
    const store = createStore(stubbedReducer, dummyState)

    emptyMockFn(QuickPickList).mockReturnValueOnce(<b></b>)
    
    const wrapper = mount(
      <Provider store={store}>
        <MyRecentItems />
      </Provider>)

    expect(QuickPickList).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [{
            item: 'Item1',
            cost: 1,
            calories: 100
          }, {
            item: 'Item2',
            cost: 2.2,
            calories: 150
          }, {
            item: 'Item3',
            cost: 3.1,
            calories: 400
          }]
      }),
      expect.any(Object))
  })

  // it('dispatches DELETE_ITEM on onDeleteItem', () => {
  //   const dummyState = {}
  //   const mockedReducer = jest.fn(() => ({ dates: {}, selectedDate: 1 }))
  //   const store = createStore(mockedReducer, dummyState)

  //   emptyMockFn(QuickPickList)
  //     .mockImplementation(({ onDeleteItem }) =>
  //       <button onClick={() => onDeleteItem(0)}></button>)
    
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MyRecentItems />
  //     </Provider>)

  //   wrapper.find('button').simulate('click')

  //   expect(mockedReducer).toHaveBeenCalledWith(
  //     expect.anything(),
  //     expect.objectContaining({
  //       type: 'DELETE_ITEM',
  //       date: 1,
  //       itemIndex: 0
  //     }))
  // })
})
// import { dateIndex } from '../../utils'
// import { myRecentItemsPresenter } from '../MyRecentItems'

// describe('myRecentItemsPresenter', () => {
//   describe('recentItems', () => {
//     it('returns the last 20 unique expenses in reverse-order of date/time, alphabetized', () => {
//       const model = {
//         dates: {
//           [dateIndex(new Date(2017, 5, 20))]: { items: [ { item: 'A' }, { item: 'B' }, { item: 'C' } ] },
//           [dateIndex(new Date(2017, 5, 19))]: { items: [ { item: 'D' }, { item: 'A' }, { item: 'B' } ] },
//           [dateIndex(new Date(2017, 5, 16))]: { items: [ { item: 'E' }, { item: 'A' }, { item: 'A' } ] },
//           [dateIndex(new Date(2017, 5, 10))]: { items: [ { item: 'A' }, { item: 'F' }, { item: 'A' } ] },
//           [dateIndex(new Date(2017, 4, 20))]: { items: [ { item: 'A' }, { item: 'A' }, { item: 'G' } ] },
//           [dateIndex(new Date(2017, 3, 20))]: { items: [ { item: 'A' }, { item: 'H' }, { item: 'A' } ] },
//           [dateIndex(new Date(2017, 2, 20))]: { items: [ { item: 'P' }, { item: 'A' }, { item: 'A' } ] },
//           [dateIndex(new Date(2017, 1, 20))]: { items: [ { item: 'A' }, { item: 'J' }, { item: 'A' } ] },
//           [dateIndex(new Date(2017, 1, 19))]: { items: [ { item: 'A' }, { item: 'A' }, { item: 'K' } ] },
//           [dateIndex(new Date(2017, 1, 18))]: { items: [ { item: 'L' }, { item: 'M' }, { item: 'N' } ] },
//           [dateIndex(new Date(2017, 1, 17))]: { items: [ { item: 'O' }, { item: 'I' }, { item: 'Q' } ] },
//           [dateIndex(new Date(2017, 1, 16))]: { items: [ { item: 'R' }, { item: 'S' }, { item: 'T' } ] }
//         }
//       }
//       const presenter = myRecentItemsPresenter(model, () => null)

//       const result = presenter.recentItems

//       expect(result.map(r => r.item).join(',')).toEqual('A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T')
//     })
//   })

//   describe('onClickRecentItem', () => {
//     it(`appends recent items to today's items list`, () => {
//       let model = { dates: { 'S': { items: [ 1, 2 ] } }, selectedDate: 'S' }
//       const presenter = myRecentItemsPresenter(model, newModel => model = newModel)

//       presenter.onClickRecentItem(3)()

//       expect(model.dates['S'].items).toEqual([1,2,3])
//     })
//   })
// })