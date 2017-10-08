import { getItem, setItem } from '../localStorageProxy'

describe('localStorageProxy', () => {
  it(`has a setItem method, which sets a key to a value, and a getItem method,
      which retrieves the value at that key`, () => {
    expect(setItem).toBeDefined()
    expect(setItem).toEqual(expect.any(Function))
    setItem('dummyKey', 'dummyValue')
    expect(getItem).toBeDefined()
    expect(getItem).toEqual(expect.any(Function))
    expect(getItem('dummyKey')).toEqual('dummyValue')
  })
})