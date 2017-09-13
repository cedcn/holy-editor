import $ from 'jquery'
import csjs, { getCss } from 'csjs'
import insertCss from 'insert-css'
import { createApp, element } from 'deku'

import css from './style/index.scss'
import toolbars from './toolbars'
import area from './area'

// controls
import * as widget from './widget'

// toolbar
import title from './extension/toolbar/title'
import bold from './extension/toolbar/bold'

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
  static register = (type, extension) => {
    store[type].push(extension)
  }

  constructor (selector = '#editor', options) {
    this.options = Object.assign({}, defaults, options)
    this.$editor = $(selector).first()

    this.initDom()
    this.initScript()
  }

  initDom = () => {
    const dom = (
      <div>
        <toolbars.Tpl
          styles={styles}
          options={this.options}
          store={store}
          widget={widget}
        />
        <area.Tpl styles={styles} />
      </div>
    )

    const render = createApp(this.$editor.get(0))
    render(dom)
  }

  initScript = () => {
    this.recordRange()
    this.$area = this.$editor.find(styles.area.selector)

    // Perform scripts
    const args = {
      options: this.options,
      widget,
      styles,
      store,
      $editor: this.$editor,
      $area: this.$area
    }
    toolbars.run(args)
    area.run(args)

    const $menu = this.$editor.find(styles.menu.selector)
    initSelection(this.$area)

    $menu.on('click', e => {
      const old = getRange()

      if (isContainsSelection(this.$area)) {
        setSelection(old.startContainer, old.startOffset, old.endContainer, old.endOffset)
        document.execCommand('bold')
      } else {
        initSelection(this.$area)
      }
    })
  }

  recordRange = () => {
    // Record range position when move out area

    let position
    $document.on('selectionchange', () => {
      const oldRange = getRange()
      if (isContainsSelection(this.$area)) {
        position = oldRange
        console.log('position', position)
      }
    })
  }

  append () {

  }

  render () {

  }

  clear () {

  }
}

HolyEditor.register('toolbar', title)
HolyEditor.register('toolbar', bold)

export default HolyEditor
