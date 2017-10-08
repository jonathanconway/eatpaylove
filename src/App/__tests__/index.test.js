import React from 'react'
import { mount } from 'enzyme'

import { dateIndex } from '../../utils'

const App = require('../index').default

jest.mock('../AppModelDatesMigrator', () => ({ migrate: jest.fn(() => ({})) }))
import { migrate } from '../AppModelDatesMigrator'

describe('index', () => {
  it('instantiates with empty localStorage', () => {
    const wrapper = mount(<App />)
  })

  it('runs the migrator on the model in localStorage', () => {
    expect(migrate).toHaveBeenCalled()
  })
})
