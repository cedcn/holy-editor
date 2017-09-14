import $ from 'jquery'
import { createApp, element } from 'deku'

import toolbars from './toolbars'
import area from './area'

import store from './store'
import styles from './styles'
// controls
import * as widget from './widget'

// toolbar
import title from './extension/tools/title'
import bold from './extension/tools/bold'

import {
  getRange,
  setSelection,
  initSelection,
  isContainsSelection
} from './utils/common'

const defaults = {
  toolbars: ['title', 'bold'],
  theme: 'default'
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
          options={this.options}
          widget={widget}
        />
        <area.Tpl />
      </div>
    )

    const render = createApp(this.$editor.get(0))
    render(dom)
    const $root = this.$editor.children().first()
    this.el = {
      $root,
      $area: $root.find(styles.area.selector),
      $toolbars: $root.find(styles.toolbars.selector)
    }
  }

  initScript = () => {
    this.recordRange()
    const args = {
      el: this.el,
      options: this.options,
      widget
    }

    toolbars.run(args)
    area.run(args)

    const $menu = this.el.$root.find(styles.menu.selector)
    initSelection(this.el.$area)

    $menu.on('click', e => {
      const old = getRange()

      if (isContainsSelection(this.el.$area)) {
        setSelection(old.startContainer, old.startOffset, old.endContainer, old.endOffset)
        document.execCommand('bold')
      } else {
        initSelection(this.el.$area)
      }
    })
  }

  recordRange = () => {
    // Record range position when move out area

    let position
    $document.on('selectionchange', () => {
      const oldRange = getRange()
      if (isContainsSelection(this.el.$area)) {
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

HolyEditor.register('tools', title)
HolyEditor.register('tools', bold)

export default HolyEditor
