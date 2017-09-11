import $ from 'jquery'
import Menu from './core/menu/Menu'

import './themes/blue'
import './themes/default'

const defaultOptions = {
  toolbars: ['title', 'bold'],
  theme: 'default'
}

class HolyEditor {
  static register = extension => {
    const { type, name } = extension
  }

  constructor (selector = '#editor', options) {
    this.selector = selector

    this.init()
  }

  init () {
    const bold = new Menu('icon')

    const v = bold.render()
    const viewer = `<div>${v}</div>`

    $('#editor').html(viewer)
  }

  append () {

  }

  render () {

  }

  clear () {

  }
}

export default HolyEditor
