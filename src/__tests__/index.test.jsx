import React from 'react'
import index from '../index'

jest.mock('../components/App', () => jest.fn(() => <div></div>))
import App from '../components/App'

// jest.mock('react-redux', () => ({ Provider: jest.fn((props) => <div>{props.children}</div>) }))

// describe('index', () => {
//   it('adds a container root div to the document body', () => {
//     expect(((((document || {}).body || {}).children || {})[0] || {}).id).toEqual('root')
//   })

//   it('renders an <App /> inside a <Provider />', () => {
//     expect(App).toHaveBeenCalledWith(expect.any(Object), expect.any(Object))
//   })
// })