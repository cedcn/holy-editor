import find from 'lodash/find'
import forEach from 'lodash/forEach'

import csjs, { getCss } from 'csjs'
import insertCss from 'insert-css'
import invariant from 'invariant'
import toolbars from './toolbars'
import area from './area'

import store from './store'
import { initSelection } from 'utils/selection'
import { toCamelCase, chunkBy } from 'utils/common'

import tooltip from './tooltip'

// controls
import widget from '../widget'

const defaults = {
  namespace: {
    area: 'editor-area',
    toolbars: 'editor-toolbars'
  },
  toolbars: [
    'html',
    'convert',
    '|',
    'title',
    '|',
    'font-size',
    '|',
    'bold',
    'italic',
    'strike-through',
    'underline',
    '|',
    'fore-color',
    '|',
    'back-color',
    '|',
    'order-list',
    'unorder-list',
    '|',
    'justify-full',
    'justify-center',
    'justify-left',
    'justify-right',
    '|',
    'code',
    '|',
    'image',
    'quote',
    'emoji',
    '|',
    'link',
    'iframe',
    'modules'
  ],
  theme: 'tacitly',
  tools: []
}

const $document = $(document)

class HolyEditor {
  static register = (type, extension) => {
    store[type].push(extension)
  }

  constructor (selector = '#editor', options) {
    this.options = Object.assign({}, defaults, options)
    // document.execCommand('styleWithCSS', false, null)

    const $editor = $(selector).first()
    const theme = find(store.themes, ['name', this.options.theme])
    invariant(typeof theme !== 'undefined', `Don't discover this theme that name is '${this.options.theme}'!`)

    let styles = `/* author: cedcn ${new Date()}?${Math.random()} */`

    const toolsGroup = chunkBy(this.options.toolbars, '|')
    const tools = toolsGroup.map(toolList => {
      return toolList.map(name => {
        const extension = find(store.tools, item => item.name === name)
        invariant(typeof extension !== 'undefined', `Don't discover this tool that name is '${name}' !`)

        if (typeof extension.style !== 'undefined') {
          styles += extension.style
        }
        this.options.tools[toCamelCase(extension.name)] = {}

        return extension
      })
    })

    styles += theme.style
    const __S_ = csjs`${styles}`

    insertCss(getCss(__S_))

    const dom = (
      <div class={__S_['holy-editor']}>
        <toolbars.Tpl
          __S_={__S_}
          tools={tools}
          namespace={this.options.namespace}
        />
        <area.Tpl
          __S_={__S_}
          namespace={this.options.namespace}
        />
      </div>
    )
    const render = dekuApp.create($editor.get(0))
    render(dom)
    const $root = $editor.children().first()

    this.el = {
      $document,
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

    toolbars.run({...args, tools})
    area.run({...args})
    tooltip('tooltip', __S_)

    $document.trigger('selectionchange')

    // trigger selectionchange
    this.el.$area.on('keydown', e => {
      if (e.which === 8) {
        setTimeout(() => {
          $document.trigger('selectionchange')
        }, 100)
      }
    })
    initSelection(this.el.$area)
  }

  append (domStr) {
    this.el.$area.append(domStr)
    initSelection(this.el.$area)
  }

  getValue () {
    const $html = this.el.$area

    const func = $selector => {
      $selector.each((index, item) => {
        const $item = $(item)
        const $children = $item.children()
        const maps = $item.get(0).attributes

        forEach(maps, attr => {
          if (/^data-heditor/.test(attr.name)) {
            $item.removeAttr(attr.name)
          }
        })

        if ($children.length > 0) {
          func($children)
        }
      })
    }

    func($html)
    return $html.html()
  }

  setValue (value) {
    this.el.$area.html(value)
    initSelection(this.el.$area)
  }

  clear () {
    this.el.$area.html('<p><br /></p>')
    initSelection(this.el.$area)
  }
}

export default HolyEditor
