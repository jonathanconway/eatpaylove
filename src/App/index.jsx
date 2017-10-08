import { connect } from '../mcp'

import App from './App'
import AppModel from './AppModel'
import AppPresenter from './AppPresenter'

import { getItem, setItem } from '../localStorageProxy'

const persistModel = model => {
  console.log('Persisting: ', model)
  setItem('chuck', JSON.stringify(model))
}

const generateModel = () => {
  const { selectedDate, dates } = (JSON.parse(getItem('chuck')) || {})
  return (new AppModel(new Date(selectedDate || new Date()), dates || {}))
}

// Migrate from old date-index format
import { migrate } from './AppModelDatesMigrator'
persistModel(migrate(generateModel()))

export default connect(AppModel, AppPresenter, App, persistModel, generateModel)