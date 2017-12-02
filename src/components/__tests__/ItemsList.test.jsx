import React from 'react'
import { mount } from 'enzyme'

import ItemsList from '../ItemsList'

describe('<ItemsList />', () => {
  it('scrolls list to bottom when a new item is received through props', done => {
    const fakeItems =
      Array(100).fill().map((_, i) => ({
        item: `item${i}`,
        calories: 1,
        cost: 2
      }));

    const wrapper = mount(<ItemsList items={fakeItems} />)

    expect(wrapper.find('div').instance().scrollTop).toEqual(0)

    wrapper.setProps({
      items: fakeItems.concat({
        item: `item99`,
        calories: 1,
        cost: 2
      })
    })

    setTimeout(() => {
      expect(wrapper.find('div').instance().scrollTop).toEqual(100000)
      done()
    }, 100)
  })
})
