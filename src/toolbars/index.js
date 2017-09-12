import invariant from 'invariant'
import find from 'lodash/find'

class Toolbars {
  constructor ({ styles, store, options }) {
    this.styles = styles
    this.store = store
    this.o = options
  }

  init () {

  }

  render () {
    const h = []
    this.o.toolbar.forEach(name => {
      const tool = find(this.store.toolbar, { name })
      invariant(typeof tool !== 'undefined', `没有找到${name}`)
      const html = tool.render()
      h.push(html)
    })
    const viewer = `<div class="${this.styles.toolbars}">${h.join()}</div>`

    return viewer
  }
}

export default Toolbars
