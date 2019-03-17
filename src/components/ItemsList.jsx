import React from 'react'

import type { Item as ItemModel }  from '../models/item'
import { arrayEqualsArrayAndSome } from '../utils'

import styled from 'styled-components'
import {
  gridSize,
  stackedContainer,
  borderRadius,
  tertiaryColor,
  allCapsHeading,
  costColour,
  caloriesColour,
  button
} from './components.styles'
const Container = styled.div`
  ${stackedContainer}
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  top: 4rem;
  height: 10rem;
  margin: ${gridSize}rem ${gridSize / 4}rem ${gridSize / 4}rem ${gridSize / 4}rem;
  box-sizing: border-box;
  border-radius: ${borderRadius}rem;
  border: solid 1px ${tertiaryColor};
  background-color: #f9f7e9;`
const Table = styled.table.attrs({
    cellSpacing: "0",
    cellPadding: `${gridSize * 10}rem`
  })`
    td, th {
      &:nth-child(1) { width: 30%; max-width: 9rem; }
      &:nth-child(2) { width: 30%; }
      &:nth-child(3) { width: 10%; }

      &:last-child {
        text-align: right;
      }

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    thead tr {
      ${allCapsHeading}
      text-align: left;
    }

    tbody td {
      border-top: solid 1px ${tertiaryColor}
    }`
  const Figure = styled.span`
    font-family: 'Roboto Mono';
    font-size: 0.9rem;`
  const Button = styled.button`
    ${button}

    display: inline-block;
    height: 1.8rem;
    font-size: 0.8rem;
    text-indent: -10000rem;
    width: 2rem;
    position: relative;

    &:after {
      content: '🗑';
      text-indent: 0;
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 1.5rem;
      height: 2rem;
      text-align: center;
    }`

  const Tfoot = styled.tfoot`
    td {
      color: white;
    }`
    const FooterLabelCell = styled.td`
      background-color: #c5c1ab;`
    const FooterCostCell = styled.td`
      background-color: ${costColour};`
    const FooterCaloriesCell  = styled.td`
      background-color: ${caloriesColour};`

type Props = {
  items: Array<ItemModel>,
  totals: {
    costs: Number,
    calories: Number
  },
  onDeleteItem: Function
}

export default class Component extends React.Component<Props, {}> {
  static defaultProps = {
    items: [
      { item: 'Sardines', cost: .66, calories: 230 },
      { item: 'Chocolate', cost: 1, calories: 100 },
      { item: 'Coffee + Soy Milk', cost: 0, calories: 100 }
    ],
    totals: {
      costs: 1.66,
      calories: 430
    },
    onDeleteItem: () => null
  }

  Container = null

  componentWillReceiveProps(nextProps: Props) {
    if (arrayEqualsArrayAndSome(this.props.items, nextProps.items)) {
      setTimeout(() => {
        if (this.Container && this.Container.scrollTop) {
          this.Container.scrollTop = 100000
        }
      })
    }
  }

  render = () => {
    const {
      items,
      totals,
      onDeleteItem
    } = this.props

    return <Container innerRef={element => this.Container = element}>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Cost</th>
            <th>Calories</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, itemIndex) =>
            <tr key={`${itemIndex}-tr`}>
              <td>{item.item}</td>
              <td><Figure>${item.cost}</Figure></td>
              <td><Figure>{item.calories}</Figure></td>
              <td>
                {<Button
                  type="button"
                  onClick={() => onDeleteItem(itemIndex)}>Delete</Button>}
              </td>
            </tr>
          )}
        </tbody>
        {items.length > 0 &&
          <Tfoot>
            <tr>
              <FooterLabelCell>Total</FooterLabelCell>
              <FooterCostCell><Figure>${totals.cost.toFixed(2)}</Figure></FooterCostCell>
              <FooterCaloriesCell><Figure>{totals.calories}</Figure></FooterCaloriesCell>
              <FooterLabelCell></FooterLabelCell>
            </tr>
          </Tfoot>}
      </Table>
    </Container>
  }
}