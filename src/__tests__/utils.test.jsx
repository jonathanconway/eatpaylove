import { dateIndex, mapUnique } from '../utils'

describe('dateIndex', () => {
  it('converts date to string of format: YYYY-MM-DD', () => {
    const fakeDate = new Date(2017, 7, 8)

    const result = dateIndex(fakeDate)

    expect(result).toEqual('2017-07-08')
  })
})

describe('mapUnique', () => {
  it('gets the unique values of a given property from the elements of an array', () => {
    const array = [ { prop: 'A' }, { prop: 'A' }, { prop: 'B' } ]

    const result = mapUnique(array, 'prop')

    expect(result.map(r => r.prop).join(',')).toEqual('A,B')
  })
})