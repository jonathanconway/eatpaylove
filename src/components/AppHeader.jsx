import React from 'react'

import styled from 'styled-components'
import {
   stackedContainer
} from './components.styles'
const TitleBar = styled.div`
  ${stackedContainer}`
  const Title = styled.h1`
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: 2.5rem;`

export default ({ children }: any) => <TitleBar>
  <Title>👄 💵 💛</Title>

  { children }
</TitleBar>
