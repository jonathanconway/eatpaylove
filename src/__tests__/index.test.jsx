import index from '../index'

describe('index', () => {
  it('adds a container root div to the document body', () => {
    expect(document.body.children[0].id).toEqual('root')
  })

  it('renders app div to the container', () => {
    expect(document.body.children[0].children[0].tagName).toEqual('DIV')
    expect(document.body.children[0].children[0].attributes.getNamedItem('data-test').value).toEqual('app')
  })
})