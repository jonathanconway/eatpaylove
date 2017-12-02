import {
  dateIndex,
  mapUnique,
  arrayMatchesEvery,
  areObjectsEqual,
  sanitizeFloat,
  arrayEqualsArrayAndSome
} from '../utils'

describe('dateIndex', () => {
  it(`converts a full date (including time) to a number, which excludes amount
      of hours, minutes, seconds and milliseconds in the date`, () => {
    const fakeDate1 =
      new Date(2017, 7, 8, 5, 5, 2, 22)
    const fakeDate2WhichVariesBy1Hour =
      new Date(2017, 7, 8, 4, 5, 2, 22)
    const fakeDate3WhichVariesBy1HourAnd1Minute =
      new Date(2017, 7, 8, 4, 4, 2, 22)
    const fakeDate4WhichVariesBy1HourAnd1MinuteAnd1Second =
      new Date(2017, 7, 8, 4, 4, 1, 22)
    const fakeDate5WhichVariesBy1HourAnd1MinuteAnd1SecondAnd1Millisecond =
      new Date(2017, 7, 8, 4, 4, 1, 23)

    const result1 =
      dateIndex(fakeDate1)
    const result2 =
      dateIndex(fakeDate2WhichVariesBy1Hour)
    const result3 =
      dateIndex(fakeDate3WhichVariesBy1HourAnd1Minute)
    const result4 =
      dateIndex(fakeDate4WhichVariesBy1HourAnd1MinuteAnd1Second)
    const result5 =
      dateIndex(fakeDate5WhichVariesBy1HourAnd1MinuteAnd1SecondAnd1Millisecond)

    expect(result1).toEqual(expect.any(Number))
    expect(result2).toEqual(expect.any(Number))
    expect(result3).toEqual(expect.any(Number))
    expect(result4).toEqual(expect.any(Number))
    expect(result5).toEqual(expect.any(Number))
    expect(result2).toEqual(result1)
    expect(result3).toEqual(result2)
    expect(result4).toEqual(result3)
    expect(result5).toEqual(result4)
  })
})

describe('mapUnique', () => {
  it('gets the unique values of a given property from the elements of an array', () => {
    const array = [ { prop: 'A' }, { prop: 'A' }, { prop: 'B' } ]

    const result = mapUnique(array, 'prop')

    expect(result.map(r => r.prop).join(',')).toEqual('A,B')
  })
})

describe('arrayMatchesEvery', () => {
  it('returns true if every item in the source array is also in the compare array', () => {
    const sourceArray = [ 1, 2, 3 ]
    const compareArray = [ 1, 2, 3 ]

    const result = arrayMatchesEvery(
      sourceArray,
      compareArray,
      (sourceItem, targetItem) => sourceItem === targetItem)

    expect(result).toBeTruthy()
  })

  it('returns true if one item in the compare array is not in the source array', () => {
    const sourceArray = [ 1, 2 ]
    const compareArray = [ 1, 2, 3 ]

    const result = arrayMatchesEvery(
      sourceArray,
      compareArray,
      (sourceItem, targetItem) => sourceItem === targetItem)

    expect(result).toBeTruthy()
  })

  it('returns false if one item in the source array is not also in the compare array', () => {
    const sourceArray = [ 1, 2, 3 ]
    const compareArray = [ 1, 2 ]

    const result = arrayMatchesEvery(
      sourceArray,
      compareArray,
      (sourceItem, targetItem) => sourceItem === targetItem)

    expect(result).toBeFalsy()
  })
})

describe('areObjectsEqual', () => {
  it('returns true if objects contain equal values when serialized', () => {
    expect(areObjectsEqual({ a: 1 }, { a: 1 })).toBeTruthy()
  })
  it('returns false if objects do not contain equal values when serialized', () => {
    expect(areObjectsEqual({ a: 1 }, { a: 2 })).toBeFalsy()
    expect(areObjectsEqual({ a: 1 }, { b: 1 })).toBeFalsy()
    expect(areObjectsEqual({ a: 1 }, { })).toBeFalsy()
    expect(areObjectsEqual({ a: 2 }, { a: 1 })).toBeFalsy()
    expect(areObjectsEqual({ b: 1 }, { a: 1 })).toBeFalsy()
    expect(areObjectsEqual({ }, { a: 1 })).toBeFalsy()
  })
})

describe('sanitizeFloat', () => {
  it('returns float from string of float', () => {
    expect(sanitizeFloat('1.2')).toEqual(1.2)
  })
  it('returns 0 from empty string', () => {
    expect(sanitizeFloat('')).toEqual(0)
  })
})

describe('arrayEqualsArrayAndSome', () => {
  it('returns true the compare array equals the source array plus additional items', () => {
    const sourceArray = [ 1, 2, 3 ]
    const compareArray = [ 1, 2, 3, 4 ]

    const result = arrayEqualsArrayAndSome(
      sourceArray,
      compareArray)

    expect(result).toBeTruthy()
  })

  it('returns false the compare array equals the source array minus an item', () => {
    const sourceArray = [ 1, 2, 3 ]
    const compareArray = [ 1, 2 ]

    const result = arrayEqualsArrayAndSome(
      sourceArray,
      compareArray)

    expect(result).toBeFalsy()
  })
})