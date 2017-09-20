import $ from 'jquery'
import {
  isContainCurrentSelection
} from 'utils/selection'

import {
  addPoint,
  inElemNode
} from 'utils/common'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $point = addPoint($selector)
  const menu = new widget.SelectMenu($point.get(0), {
    options: [{
      label: 'code',
      value: ''
    }, {
      label: 'javascript',
      value: 'javascript'
    }, {
      label: 'ruby',
      value: 'ruby'
    }],
    onSelect: checked => {
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)

      if (range.collapsed) {
        const node = inElemNode(range.startContainer, 'pre')
        if (node === null) {
          document.execCommand('insertHTML', false, `<pre class="${checked.value} hljs"><br/></pre>`)
        } else {
          node.setAttribute('class', `${checked.value} hljs`)
        }
      } else {
        const snode = inElemNode(range.startContainer, 'pre')
        const enode = inElemNode(range.endContainer, 'pre')

        if (snode === null && enode === null) {
          const text = range.toString()
          document.execCommand('insertHTML', false, `<pre class="${checked.value} hljs">${text}</pre>`)
        }

        if (snode !== null && enode !== null && snode === enode) {
          snode.setAttribute('class', `${checked.value} hljs`)
        }
      }
    }
  })

  el.$area.on('keydown', e => {
    if (e.which === 13) {
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)

      if (range.collapsed) {
        const node = inElemNode(range.startContainer, 'pre')
        if (node !== null) {
          e.preventDefault()
          const text = range.endContainer.textContent

          if (range.endContainer.nodeType === 1) {
            document.execCommand('insertHTML', false, '\n\n')
          } else {
            if (!/\n$/.test(text) && range.endContainer.length === range.endOffset) {
              document.execCommand('insertHTML', false, '\n\n')
            } else {
              document.execCommand('insertHTML', false, '\n')
            }
          }
        }
      } else {
        e.preventDefault()
      }
    }
  })

  el.$area.on('mousedown', e => {
    const $pre = el.$area.find('pre')

    $pre.each((index, item) => {
      const $item = $(item)
      if (e.pageY > $item.offset().top + $item.innerHeight()) {
        let $elem = null
        const func = ($item, $area) => {
          if ($item.parent().get(0) === $area.get(0)) {
            $elem = $item
          } else {
            func($item.parent(), $area)
          }
        }

        func($item, el.$area)

        if ($elem.next().length === 0) {
          el.$area.append('<div><br /></div>')
        }
      }
    })
  })

  $(document).on('selectionchange', () => {
    if (isContainCurrentSelection(el.$area)) {
      $selector.addClass(__S_['is-available'].className)
      menu.enable()
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)

      if (!range.collapsed) {
        const snode = inElemNode(range.startContainer, 'pre')
        const enode = inElemNode(range.endContainer, 'pre')

        if ((snode !== null && enode === null) || (snode === null && enode !== null) || (snode !== null && enode !== null && snode !== enode)) {
          $selector.removeClass(__S_['is-available'].className)
          menu.disable()
        }
      }
    } else {
      $selector.removeClass(__S_['is-available'].className)
      menu.disable()
    }
  })
}

const code = {
  name: 'code',
  run: sciprt,
  style: ''
}

export default code
