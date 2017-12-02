import React from 'react'

import styled from 'styled-components'
import {
  button
} from './components.styles'
const Container = styled.div`
  float: right;`
  const BackForwardButton = styled.button`
    ${button}
    display: inline-block;
    vertical-align: top;
    text-align: center;
    width: 4rem;
    height: 3.2rem;
    position: relative;
    margin-top: 0.2rem;

    &.icon {
      text-indent: -10000rem;
    }

    &.icon:after {
      display: inline-block;
      position: absolute;
      width: 4rem;
      height: 2.5rem;
      line-height: 3.2rem;
      font-size: 2rem;
      text-indent: 0;
      left: 0;
      top: 0;
      text-align: center;
    }

    &.icon--backward:after {
      content: '←';
    }

    &.icon--forward:after {
      content: '→';
    }`
  const SubTitle = styled.h2`
    width: 3rem;
    display: inline-block;
    margin: 0 0.5rem;
    text-align: center;
    height: 3.2rem;
    font-family: 'Roboto Mono';
    line-height: 1.3rem;
    padding-top: 0.25rem;

    > span {    
      width: 100%;
      display: inline-block;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }`
    const MonthDay = styled.span`
      font-size: 0.8rem;`
    const Year = styled.span`
      font-size: 1rem;`

const formatDateAsMonthDayBulletted = date => [
    date.getDate().toString().padStart(2, 0),
    '•',
    (date.getMonth() + 1).toString().padStart(2, 0)
  ].join('')

const formatDateAsYear = date =>
  date.getFullYear().toString()

type Props = {
  selectedDate: Date,

  onGoBackwardOneDay: Function,
  onGoForwardOneDay: Function  
}

const Component = ({
  selectedDate,

  onGoBackwardOneDay,
  onGoForwardOneDay
}: Props) => <Container>
  <BackForwardButton type="button" className="icon icon--backward" onClick={onGoBackwardOneDay}>Backward</BackForwardButton>
  <SubTitle>
    <MonthDay>
      {formatDateAsMonthDayBulletted(selectedDate)}
    </MonthDay>
    <Year>{formatDateAsYear(selectedDate)}</Year>
  </SubTitle>
  <BackForwardButton type="button" className="icon icon--forward" onClick={onGoForwardOneDay}>Forward</BackForwardButton>
</Container>

Component.defaultProps = {
  selectedDate: new Date(),

  onGoBackwardOneDay: () => null,
  onGoForwardOneDay: () => null
}

export default Component