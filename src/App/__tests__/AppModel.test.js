import AppModel from '../AppModel'

describe('AppModel', () => {
  it('instantiates with today\'s date selected', () => {
    const model = new AppModel()
    const date = new Date()

    const selectedDate = model.selectedDate
    
    expect(selectedDate.getFullYear()).toEqual(date.getFullYear())
    expect(selectedDate.getMonth()).toEqual(date.getMonth())
    expect(selectedDate.getDate()).toEqual(date.getDate())
  })
})
