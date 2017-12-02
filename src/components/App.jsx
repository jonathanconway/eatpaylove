import React from 'react'

import AppHeader                from './AppHeader'
import Panel, { PanelHeading }  from './Panel'
import AppFooter                from './AppFooter'

import MyItems                  from '../containers/MyItems'
import AddItem                  from '../containers/AddItem'
import MyRecentItems            from '../containers/MyRecentItems'
import SelectDate               from '../containers/SelectDate'

import styled from 'styled-components'
const Body = styled.div`
  margin: 0;
  padding: 0;`

export default class App extends React.Component<{}, {}> {
  render = () => {
    return <Body data-test="app">
      <AppHeader>
        <SelectDate />
      </AppHeader>

      <MyItems />

      <AddItem />

      <Panel>
        <PanelHeading>Recent Entries</PanelHeading>

        <MyRecentItems />
      </Panel>

      <AppFooter />
    </Body>
  }
}