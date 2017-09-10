import { connect } from '../mcp'

import App from './App'
import AppModel from './AppModel'
import AppPresenter from './AppPresenter'

const persistModel = model => {
  console.log('model', model)
  localStorage.setItem('chuck', JSON.stringify(model))
}

const generateModel = () => {
  const { selectedDate, dates } = (JSON.parse(localStorage.getItem('chuck')) || {})
  return (new AppModel(new Date(selectedDate || new Date()), dates || {}))
}

export default connect(AppModel, AppPresenter, App, persistModel, generateModel)