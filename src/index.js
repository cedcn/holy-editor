import $ from 'jquery'
import csjs, { getCss } from 'csjs'
import insertCss from 'insert-css'
import { createApp, element } from 'deku'

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
    store[type].push(<Extension styles={styles} controls={controls} />)
  }

  constructor (selector = '#editor', options) {
    this.o = Object.assign({}, defaults, options)
    this.$editor = $(selector)
    this.init()
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
  }

  initExtension = () => {
    this.constructor.register('toolbar', Title)
    this.constructor.register('toolbar', Bold)
  }

  initDom = () => {
    const doms = (
      <div>
        <Toolbars styles={styles} options={this.o} store={store} />
        <Area styles={styles} />
      </div>
    )

    let render = createApp(this.$editor.get(0))

    render(doms)
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
