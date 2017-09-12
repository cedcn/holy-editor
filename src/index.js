import $ from 'jquery'
import csjs, { getCss } from 'csjs'
import insertCss from 'insert-css'

import css from './style/index.scss'
import Toolbars from './toolbars'
import EditArea from './edit_area'

import Title from './extension/toolbar/title'
import Bold from './extension/toolbar/bold'

import { getRange } from './utils/area'
import { setSelection, initSelection, isContainsSelection } from './utils/tool'

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

  constructor (selector = '#editor', options) {
    this.selector = selector
    this.o = Object.assign({}, defaults, options)

    this.init()
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

  initExtension () {
    this.constructor.register('toolbar', new Title({ styles }))
    this.constructor.register('toolbar', new Bold({ styles }))

    this.constructor.register('theme', {
      name: 'default',
      css: ''
    })
  }

  initSelection () {

  }

  init () {
    this.initExtension()

    const toolbars = new Toolbars({
      styles,
      store,
      options: this.o
    })

    const area = new EditArea({
      styles
    })

    const $editor = $('#editor')
    $editor.html(`<div>${toolbars.render()}${area.render()}</div>`)
    const $editArea = $(styles['edit-area'].selector)

    initSelection($editArea)

    $(styles.menu.selector).on('click', e => {
      const old = getRange()

      if (isContainsSelection($editArea)) {
        setSelection(old.startContainer, old.startOffset, old.endContainer, old.endOffset)
        document.execCommand('bold')
      } else {
        initSelection($editArea)
      }
    })

    $(document).on('selectionchange', () => {
      const selection = window.getSelection()
      console.log(selection)
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
