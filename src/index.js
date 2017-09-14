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
import modules from './extension/tools/modules'

import {
  isContainsSelection
} from './utils/common'

const defaults = {
  toolbars: ['title', 'bold', 'modules'],
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

    const args = {
      el: this.el,
      options: this.options,
      widget
    }

    toolbars.run(args)
    area.run(args)

    // listen selectionchange
    $document.on('selectionchange', () => {

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
HolyEditor.register('tools', modules)

export default HolyEditor
