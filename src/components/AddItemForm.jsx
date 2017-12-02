import React from 'react'

import { sanitizeFloat } from '../utils'

import styled from 'styled-components'
import {
   stackedContainer
  ,borderRadius
  ,button
} from './components.styles'
const Form = styled.form`
  ${stackedContainer}
  height: 3rem;
  margin: 0;
  box-sizing: border-box;
  top: 15rem;`
  const expenseElement = `
    display: inline-block;
    box-sizing: border-box;
    height: 100%;
    font-size: 1.5rem;
    vertical-align: top;`
  const inputElement = `
    ${expenseElement}
    appearance: none;
    border-radius: ${borderRadius}rem;
    border: solid 1px silver;
    padding: 0 0 0 0.5rem;`
  const expenseButton = `
    ${expenseElement}
    ${button}
    width: 4rem;
    height: 2.9rem;`
  const ItemInput = styled.input`
    ${inputElement}
    width: 42%;`
  const CostInput = styled.input`
    ${inputElement}
    width: 18%;`
  const CaloriesInput = styled.input`
    ${inputElement}
    width: 18%;`
  const AddButton = styled.button`
    ${expenseButton}
    padding: 0;
    float: right;
    position: relative;
    text-align: center;
    color: transparent;

    &:after {
      content: '+';
      position: absolute;
      margin: auto;
      color: black;
      top: 0;
      left: 0;
      width: 100%;
    }`

const handleFocusBySettingTypeToTextAndSelectingAll = e => {
  e.persist()
  setTimeout(() => {
    e.target.selectionStart = 0
    e.target.selectionEnd = e.target.value.length
  })
}

type Props = {
  item: String,
  cost: Number,
  calories: Number,
  onChangeField: Function,
  onClickAddItem: Function
}

export default class Component extends React.Component<Props, {}> {
  static defaultProps = {
    item: '',
    cost: 0,
    calories: 0,
    onChangeField: () => null,
    onClickAddItem: () => null
  }

  ItemInput = null
  CostInput = null
  CaloriesInput = null

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.item !== nextProps.item &&
        this.props.cost !== nextProps.cost &&
        this.props.calories !== nextProps.calories &&

        nextProps.item === '' &&
        nextProps.cost === 0 &&
        nextProps.calories === 0) {
      setTimeout(() => this.ItemInput && this.ItemInput.focus())
    }
  }

  render = () => {
    const {
      item,
      cost,
      calories,

      onChangeField,
      onClickAddItem
    } = this.props

    return <Form onSubmit={e => {
        e.preventDefault()
        onClickAddItem()
        
        if (this.ItemInput) {
          this.ItemInput.focus()
        }

        if (this.CostInput && this.CostInput.type) {
          this.CostInput.type = "number"
        }

        if (this.CaloriesInput && this.CaloriesInput.type) {
          this.CaloriesInput.type = "number"        
        }
      } }>
      <ItemInput
        type="text"
        autocomplete="off" 
        placeholder="Item"
        required="required"
        name="item"
        value={item}
        onChange={e => onChangeField('item', e.target.value)}
        innerRef={element => this.ItemInput = element}
      />
      <CostInput
        type="number"
        maxlength={5}
        placeholder="Cost"
        name="cost"
        value={cost}
        onChange={e => onChangeField('cost', sanitizeFloat(e.target.value))}
        onFocus={handleFocusBySettingTypeToTextAndSelectingAll}
        innerRef={element => this.CostInput = element}
      />
      <CaloriesInput
        type="number"
        maxlength={5}
        placeholder="Cal"
        name="calories"
        value={calories}
        onChange={e => onChangeField('calories', sanitizeFloat(e.target.value))}
        onFocus={handleFocusBySettingTypeToTextAndSelectingAll}
        innerRef={element => this.CaloriesInput = element}
      />
      <AddButton
        type="submit"
        onClick={() => {
          this.CostInput.type = "text"
          this.CaloriesInput.type = "text"
        }}
      >Add Expense</AddButton>
    </Form>
  }
}