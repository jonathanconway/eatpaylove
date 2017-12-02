import styled from 'styled-components'
import {
   stackedContainer
  ,borderRadius
  ,tertiaryColor
  ,allCapsHeading
} from './components.styles'
export default styled.div`
  ${stackedContainer}
  top: 20.5rem;
  height: 12rem;
  overflow: scroll;
  border-radius: ${borderRadius}rem;
  border: solid 1px ${tertiaryColor};
  padding: 0 0 0 0.5rem;
  box-sizing: border-box;`
  export const PanelHeading = styled.h2`
    ${allCapsHeading}
    color: gray`