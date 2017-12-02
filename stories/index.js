import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { inject } from '../src/global.styles'
inject()

import App from '../src/components/App'
storiesOf('App', module)
  .add('default', () => <App />)

import AppHeader from '../src/components/AppHeader'
storiesOf('AppHeader', module)
  .add('default', () => <AppHeader />)

import AppFooter from '../src/components/AppFooter'
storiesOf('AppFooter', module)
  .add('default', () => <AppFooter />)

import DateControls from '../src/components/DateControls'
storiesOf('DateControls', module)
  .add('default', () => <DateControls />)

import ItemsList from '../src/components/ItemsList'
storiesOf('ItemsList', module)
  .add('default', () => <ItemsList />)

import AddItemForm from '../src/components/AddItemForm'
storiesOf('AddItemForm', module)
  .add('default', () => <AddItemForm />)

import Panel from '../src/components/Panel'
storiesOf('Panel', module)
  .add('default', () => <Panel />)

import QuickPickList from '../src/components/QuickPickList'
storiesOf('QuickPickList', module)
  .add('default', () => <QuickPickList />)