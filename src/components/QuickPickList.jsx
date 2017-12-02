import React from 'react'

import type { Item as ItemModel } from '../models/item'

import styled from 'styled-components'
import {
   borderRadius
  ,costColour
  ,caloriesColour
} from './components.styles'
const Recent = styled.div`
  display: inline-block;
  
  border: solid 1px silver;
  border-radius: ${borderRadius}rem;
  margin: 0 0.9rem 0.9rem 0;
  width: 45%;
  
  > * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.2rem;
    display: inline-block;
  }`
  const RecentItem = styled.span`
    width: 50%;`
  const RecentCost = styled.span`
    width: 25%;
    color: ${costColour};`
  const RecentCalories = styled.span`
    width: 25%;
    color: ${caloriesColour};`

type Props = {
  items: Array<ItemModel>,
  onClickItem: Function  
}

const Component = ({
  items,
  onClickItem
}: Props) => <div>
  {items.map((recent, itemIndex) =>
    <Recent key={'recent' + recent.item + itemIndex} onClick={() => onClickItem(recent)}>
      <RecentItem>{recent.item}</RecentItem>
      <RecentCost>${recent.cost}</RecentCost>
      <RecentCalories>{recent.calories}</RecentCalories>
    </Recent>
  )}
</div>

Component.defaultProps = {
  items: [{
    item: 'Item1',
    cost: 1,
    calories: 100
  }, {
    item: 'Item2',
    cost: 2.2,
    calories: 150
  }, {
    item: 'Item3',
    cost: 3.1,
    calories: 400
  }],
  onClickItem: () => null
}

export default Component