window.document.body.innerHTML = '<div id="root"></div>'


setInterval(() => window.scrollTo(0, 0))


import { inject } from './global.styles'
inject()


import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import { compose, applyMiddleware, createStore } from 'redux'


import storage from 'redux-persist/es/storage'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore, persistReducer} from 'redux-persist'
import reducer from './reducer'
const store = createStore(
  persistReducer({ key: 'eatpaylove', storage }, reducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const persistor = persistStore(store)


import App from './components/App'
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  ((document.querySelector('#root') || {})))