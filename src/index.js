import $ from 'jquery'
import csjs, { getCss } from 'csjs'
import insertCss from 'insert-css'

import css from './style/index.scss'
import Toolbars from './toolbars'
import Area from './area'

// controls
import * as controls from './controls'

// toolbar
import Title from './extension/toolbar/title'
import Bold from './extension/toolbar/bold'

import {
  getRange,
  setSelection,
  initSelection,
  isContainsSelection
} from './utils/tool'

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

const $document = $(document)

class HolyEditor {
  static register = (type, Extension) => {
    const extension = new Extension({ styles, controls })
    store[type].push(extension)
  }

  constructor (selector = '#editor', options) {
    this.o = Object.assign({}, defaults, options)
    this.$editor = $(selector)
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

  init = () => {
    this.initExtension()
    this.initDom()
    this.recordRange()

    this.$area = this.$editor.find(styles.area.selector)
    initSelection(this.$area)

    $(styles.menu.selector).on('click', e => {
      const old = getRange()

      if (isContainsSelection(this.$area)) {
        setSelection(old.startContainer, old.startOffset, old.endContainer, old.endOffset)
        document.execCommand('bold')
      } else {
        initSelection(this.$area)
      }
    })

    $document.on('selectionchange', () => {

    })
  }

  initExtension = () => {
    this.constructor.register('toolbar', Title)
    this.constructor.register('toolbar', Bold)
  }

  initDom = () => {
    const toolbars = new Toolbars({
      styles,
      store,
      options: this.o
    })

    const area = new Area({
      styles
    })

    this.$editor.html(`<div>${toolbars.render()}${area.render()}</div>`)
  }

  recordRange = () => {
    // Record range position when move out area

    let position
    $document.on('selectionchange', () => {
      const oldRange = getRange()
      if (isContainsSelection(this.$area)) {
        position = oldRange
      }
      console.log('position', position)
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
