import { migrate } from '../AppModelDatesMigrator'
import AppModel from '../AppModel'
import { dateIndex } from '../../utils'

describe('AppModelDatesMigrator', () => {
  describe('migrate', () => {
    it('migrates all legacy "string-date" indeces over to the new dateIndex',
      () => {
      const model = new AppModel(
        new Date(),
        {
          ['2017-09-01']: { items: [1,2] },
          ['2017-09-05']: { items: [3,4] },
          ['2017-10-05']: { items: [5,6,7] }
        })

      expect(model.dates['2017-09-01']).toBeDefined()
      expect(model.dates['2017-09-05']).toBeDefined()
      expect(model.dates['2017-10-05']).toBeDefined()

      const result = migrate(model)

      expect(result.dates['2017-09-01'])
        .not.toBeDefined()
      expect(result.dates['2017-09-05'])
        .not.toBeDefined()
      expect(result.dates['2017-10-05'])
        .not.toBeDefined()
      expect(result.dates[dateIndex(new Date(2017, 8, 1))])
        .toBeDefined()
      expect(result.dates[dateIndex(new Date(2017, 8, 5))])
        .toBeDefined()
      expect(result.dates[dateIndex(new Date(2017, 9, 5))])
        .toBeDefined()
      expect(result.dates[dateIndex(new Date(2017, 8, 1))])
        .toEqual({ items: [1,2] })
      expect(result.dates[dateIndex(new Date(2017, 8, 5))])
        .toEqual({ items: [3,4] })
      expect(result.dates[dateIndex(new Date(2017, 9, 5))])
        .toEqual({ items: [5,6,7] })
    })

    it(`merges items at new dateIndex on top of items at legacy "string-date"
        index, if there are items at both`,
      () => {

      const model = new AppModel(
        new Date(),
        {
          ['2017-09-01']: { items: [1,2] },
          [dateIndex(new Date(2017, 8, 1))]: { items: [3,4] }
        })

      const result = migrate(model)

      expect(result.dates[dateIndex(new Date(2017, 8, 1))])
        .toEqual({ items: [1,2,3,4] })
    })

    describe(`merely removes items at legacy "string-date", without affecting
             items at new dateIndex`, () => {

      it(`if there aren't any items at legacy "string-date"`, () => {
        const model = new AppModel(new Date(),
          {
            ['2017-09-01']: { },
            [dateIndex(new Date(2017, 8, 1))]: { items: [3,4] }
          })

        const result = migrate(model)

        expect(result.dates[dateIndex(new Date(2017, 8, 1))])
          .toEqual({ items: [3,4] })
      })
    })

    it(`if items property at legacy "string-date" is not an array`, () => {
      const model = new AppModel(new Date(),
        {
          ['2017-09-01']: { items: {} },
          [dateIndex(new Date(2017, 8, 1))]: { items: [3,4] }
        })

      const result = migrate(model)

      expect(result.dates[dateIndex(new Date(2017, 8, 1))])
        .toEqual({ items: [3,4] })
    })

    it(`if there is no date at new dateIndex`, () => {
      const model = new AppModel(new Date(),
        {
          ['2017-09-01']: { items: {} },
          [dateIndex(new Date(2017, 8, 2))]: { items: [3,4] }
        })

      const result = migrate(model)

      expect(result.dates[dateIndex(new Date(2017, 8, 2))])
        .toEqual({ items: [3,4] })
      expect(result.dates['2017-09-01'])
        .not.toBeDefined()
    })
  })
})
