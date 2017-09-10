import React from 'react'
import { mount } from 'enzyme'

import { connect, Presenter } from '../mcp'

describe('connect', () => {

  class MyPresenter extends Presenter {
    constructor(model, setModel) {
      super(model, setModel)
    }

    getNameLength = () => (this.model.firstName + ' ' + this.model.lastName).length

    onButtonClick = () => this.setModel({ firstName: 'Gandalf', lastName: 'Grey' })
  }

  class MyModel {
    firstName = 'Bilbo'

    lastName = 'Baggins'
  }

  class MyComponent extends React.Component {
    render = () => <div>
      <span>{this.props.firstName} {this.props.lastName} {this.props.getNameLength()}</span>
      <button onClick={this.props.onButtonClick} />
    </div>
  }

  it(`- renders a component,
      - passes the component, as props, the model props and the presenter methods
      - passes the presenter the current model
      - passes model-updates from the presenter to the model`, () => {

    const MyConnectedComponent = connect(MyModel, MyPresenter, MyComponent)

    const wrapper = mount(<MyConnectedComponent />)

    expect(wrapper.text()).toMatch('Bilbo Baggins 13')

    wrapper.find('button').simulate('click')

    expect(wrapper.text()).toMatch('Gandalf Grey 12')
    
  })

  it(`- optionally calls the passed persistModel, if passed, on each model update
      - optionally calls the passed createModel, if passed, to construct the model`, () => {

    const persistModel = jest.fn()

    const generateModel = jest.fn()
    generateModel.mockReturnValueOnce(new MyModel())

    const MyConnectedComponent = connect(MyModel, MyPresenter, MyComponent, persistModel, generateModel)

    const wrapper = mount(<MyConnectedComponent />)

    expect(generateModel).toHaveBeenCalled()
    expect(wrapper.text()).toMatch('Bilbo Baggins 13')

    wrapper.find('button').simulate('click')

    expect(persistModel).toHaveBeenCalledWith(expect.objectContaining({ firstName: 'Gandalf', lastName: 'Grey' }))

  })
})
