import $ from 'jquery'
import { createApp, element } from 'deku'
import find from 'lodash/find'
import csjs, { getCss } from 'csjs'
import insertCss from 'insert-css'
import invariant from 'invariant'

import toolbars from '../toolbars'
import area from '../area'

import store from './store'

// controls
import widget from '../widget'

const defaults = {
  toolbars: [
    'title',
    'bold',
    'italic',
    'underline',
    'strike-through',
    'fore-color',
    'modules'
  ],
  theme: 'tacitly'
}

const $document = $(document)

class HolyEditor {
  static register = (type, extension) => {
    store[type].push(extension)
  }

  constructor (selector = '#editor', options) {
    this.options = Object.assign({}, defaults, options)
    this.$editor = $(selector).first()

    const theme = find(store.themes, ['name', this.options.theme])
    invariant(typeof theme !== 'undefined', `Don't discover '${this.options.theme}' theme!`)

    const __S_ = csjs`${theme.styles}`
    insertCss(getCss(__S_))

    const dom = (
      <div>
        <toolbars.Tpl
          options={this.options}
          widget={widget(__S_)}
          __S_={__S_}
        />
        <area.Tpl __S_={__S_} />
      </div>
    )

    const render = createApp(this.$editor.get(0))
    render(dom)
    const $root = this.$editor.children().first()

    this.el = {
      $root,
      $area: $root.find(__S_.area.selector),
      $toolbars: $root.find(__S_.toolbars.selector)
    }

    const args = {
      el: this.el,
      options: this.options,
      widget: widget(__S_),
      __S_
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

export default HolyEditor
