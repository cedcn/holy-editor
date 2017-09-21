import $ from 'jquery'
import {
  isSelectionInArea,
  getRange
} from 'utils/selection'

import {
  addPoint,
  hasElemNode,
  toEnable,
  toDisable,
  inElemNode,
  isInRange
} from 'utils/common'


const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $point = addPoint($selector)

  const menu = new widget.Menu($point.get(0), {
    icon: 'quote',
    onMouseDown: e => {
      const range = getRange()
      const snode = inElemNode(range.startContainer, 'BLOCKQUOTE')
      const enode = inElemNode(range.endContainer, 'BLOCKQUOTE')

      if (range.collapsed) {
        if (snode === null) {
          console.log(range)
          document.execCommand('insertHTML', false, `<blockquote><div><br/></div></blockquote>`)
        }
      } else {
        if (snode === null && enode === null) {
          const text = range.cloneContents().toString()
          document.execCommand('insertHTML', false, `<blockquote><div>${text}</div></blockquote>`)
        }
      }
    }
  })

  el.$area.on('mousedown', e => {
    const $pre = el.$area.find('blockquote')

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
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()

      if (isInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (!range.collapsed) {
        if (hasElemNode(range.cloneContents(), 'BLOCKQUOTE')) {
          toDisable($selector, __S_, () => menu.disable())
        }
      } else {
        const snode = inElemNode(range.startContainer, 'BLOCKQUOTE')

        if (snode !== null) {
          $selector.addClass(__S_['is-active'].className)
        } else {
          $selector.removeClass(__S_['is-active'].className)
        }
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const quote = {
  name: 'quote',
  run: sciprt,
  style: ''
}

export default quote