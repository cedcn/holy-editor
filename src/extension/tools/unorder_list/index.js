import $ from 'jquery'

import {
  isSelectionInArea,
  getRange
} from 'utils/selection'

import {
  isInRange,
  isAvailable,
  toEnable,
  toDisable
} from 'utils/common'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const menu = new widget.Menu($selector, {
    icon: 'unorder-list',
    onMouseDown: e => {
      e.preventDefault()
      if (!isAvailable($selector, __S_)) return
      document.execCommand('insertUnorderedList')
      $(document).trigger('selectionchange')
    }
  })

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (isInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (document.queryCommandState('insertUnorderedList')) {
        $selector.addClass(__S_['is-active'].className)
      } else {
        $selector.removeClass(__S_['is-active'].className)
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const unorderList = {
  name: 'unorder-list',
  run: sciprt,
  style: ''
}

export default unorderList
