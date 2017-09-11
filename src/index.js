import $ from 'jquery'
import csjs, { getCss } from 'csjs'
import { find } from 'lodash'
import insertCss from 'insert-css'
import css from './style/index.scss'
import Title from './toolbar/title'

const styles = csjs`${css}`

insertCss(getCss(styles))

const defaults = {
  toolbar: ['title', 'bold'],
  theme: 'default'
}

const store = {
  toolbar: [],
  theme: []
}

class HolyEditor {
  static register = (type, extension) => {
    store[type].push(extension)
  }

  static unRegister = (type, extension) => {
    store[type].push(extension)
  }

  constructor (selector = '#editor', options) {
    this.selector = selector
    this.o = Object.assign({}, defaults, options)

    this._init()
  }

  manage = {
    theme: {
      set: () => {},
      get: () => {}
    },
    toolbar: {
      add: () => {},
      get: () => {}
    }
  }

  _initExtension () {
    this.constructor.register('toolbar', new Title({ styles }))

    this.constructor.register('theme', {
      name: 'default',
      css: ''
    })
  }

  _init () {
    this._initExtension()
    let viewer = []
    this.o.toolbar.forEach(name => {
      const tool = find(store.toolbar, { name })
      if (typeof tool === 'undefined') {
        console.log(`没有找到${name}`)
        return
      }
      const html = tool.render()
      viewer.push(html)
      $('#editor').html(viewer.join())
    })
  }

  append () {

  }

  render () {

  }

  clear () {

  }
}

export default HolyEditor
