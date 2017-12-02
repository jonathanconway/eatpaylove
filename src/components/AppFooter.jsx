import React from 'react'

import styled from 'styled-components'
import {
   stackedContainer
  ,tertiaryColor
} from './components.styles'
const Footer = styled.footer`
  ${stackedContainer}
  bottom: 0rem;
  height: 2rem;
  text-align: center;

  &, a {
    color: ${tertiaryColor};
  }`
  const CopyrightSymbol = styled.span`
    transform: scale(-1, 1);`

export default () => <Footer>
  <CopyrightSymbol>&copy;</CopyrightSymbol> 2017 • a <a href="http://conwy.co">CONW_Y</a> experiment • <a href="https://github.com/jonathanconway/eatpaylove">Source</a>
</Footer>
