import $ from 'jquery'
import {
  isSelectionInArea,
  getRange
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
    }, {
      label: 'python',
      value: 'python'
    }],
    onSelect: checked => {
      const range = getRange()
      const snode = inElemNode(range.startContainer, 'PRE')
      const enode = inElemNode(range.endContainer, 'PRE')

      if (range.collapsed) {
        if (snode === null) {
          document.execCommand('insertHTML', false, `<pre class="${checked.value} hljs" data-value="${checked.value}" data-label="${checked.label}"><br/></pre>`)
        } else {
          snode.setAttribute('class', `${checked.value} hljs`)
          snode.dataset.value = checked.value
          snode.dataset.label = checked.label
        }
      } else {
        if (snode === null && enode === null) {
          const text = range.toString()
          document.execCommand('insertHTML', false, `<pre class="${checked.value} hljs" data-value="${checked.value}" data-label="${checked.label}"}>${text}</pre>`)
        }

        if (snode !== null && enode !== null && snode === enode) {
          snode.setAttribute('class', `${checked.value} hljs`)
          snode.dataset.value = checked.value
          snode.dataset.label = checked.label
        }
      }
    }
  })

  el.$area.on('keydown', e => {
    if (e.which === 13) {
      const range = getRange()

      if (range.collapsed) {
        const node = inElemNode(range.startContainer, 'PRE')

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
    if (isSelectionInArea(el.$area)) {
      $selector.addClass(__S_['is-available'].className)
      menu.enable()
      const range = getRange()
      const snode = inElemNode(range.startContainer, 'PRE')
      const enode = inElemNode(range.endContainer, 'PRE')

      if (!range.collapsed) {
        if ((snode !== null && enode === null) || (snode === null && enode !== null) || (snode !== null && enode !== null && snode !== enode)) {
          $selector.removeClass(__S_['is-available'].className)
          menu.disable()
        }
      } else {
        if (snode !== null) {
          menu.setChecked({ value: snode.dataset.value, label: snode.dataset.label })
        } else {
          menu.setChecked({ value: '', label: 'code' })
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
