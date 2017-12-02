import React from 'react'
import { mount } from 'enzyme'

import AddItemForm from '../AddItemForm'

describe('<AddItemForm />', () => {
  it('focuses first field when pristine item props are received', done => {
    const wrapper = mount(
      <AddItemForm {...{
        item: 'abc',
        cost: 1, 
        calories: 2
      }}
    />)

    wrapper.setProps({
      item: '',
      cost: 0, 
      calories: 0
    })

    setTimeout(() => {
      expect(document.activeElement.name).toEqual('item')
      done()
    }, 100)
  })

  it('converts cost and calories inputted to float', () => {
    const onChangeField = jest.fn()

    const wrapper = mount(
      <AddItemForm {...{
        item: '',
        cost: 0, 
        calories: 0,
        onChangeField
      }}
    />)

    const verifyNumericChange = fieldName => {
      wrapper.find(`[name="${fieldName}"]`).at(1).simulate('change', { target: { value: '11.5' } })
      expect(onChangeField).toHaveBeenCalledWith(fieldName, 11.5)
    }

    verifyNumericChange('cost')
    verifyNumericChange('calories')

    const verifyBlankChange = fieldName => {
      wrapper.find(`[name="${fieldName}"]`).at(1).simulate('change', { target: { value: '' } })
      expect(onChangeField).toHaveBeenCalledWith(fieldName, 0)
    }

    verifyBlankChange('cost')
    verifyBlankChange('calories')
  })

  it('focuses first field when form is submitted', () => {
    const wrapper = mount(<AddItemForm />)

    wrapper.find('[name="cost"]').at(1).instance().focus()
    wrapper.find('form').simulate('submit')

    expect(document.activeElement.name).toEqual('item')
  })

  // it('selects all text when field when is focussed', (done) => {
  //   const wrapper = mount(<AddItemForm />)

  //   wrapper.find('[name="cost"]').at(1).instance().focus()

  //   setTimeout(() => {
  //     expect(document.activeElement.type).toEqual('text')
  //     expect(document.activeElement.selectionStart).toEqual(0)
  //     expect(document.activeElement.selectionEnd).toEqual(1)
  //     done()
  //   }, 100)
  // })
})
