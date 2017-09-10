import React from 'react'
import { mount } from 'enzyme'

import { LocalStorageMock } from '../../__mocks__/localStorage'
import App from '../index'

global.localStorage = new LocalStorageMock({
  chuck: JSON.stringify({
  })
});

describe('App', () => {
  it('instantiates with empty localStorage', () => {
    const wrapper = mount(<App />)
  })
})
