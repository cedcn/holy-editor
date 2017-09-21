import $ from 'jquery'

import {
  isSelectionInArea,
  getRange
} from 'utils/selection'

import {
  addPoint,
  isInRange,
  isAvailable,
  toEnable,
  toDisable
} from 'utils/common'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = addPoint($selector)

  const menu = new widget.Menu($menuPoint.get(0), {
    icon: 'order-list',
    onMouseDown: e => {
      e.preventDefault()
      if (!isAvailable($selector, __S_)) return
      document.execCommand('insertOrderedList')
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

      if (document.queryCommandState('insertOrderedList')) {
        $selector.addClass(__S_['is-active'].className)
      } else {
        $selector.removeClass(__S_['is-active'].className)
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const orderList = {
  name: 'order-list',
  run: sciprt,
  style: ''
}

export default orderList
