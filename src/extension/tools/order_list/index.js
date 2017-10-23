import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  isAvailable,
  toEnable,
  toDisable,
  addTooltip
} from 'utils/common'

const defaults = {
  tooltip: '有序列表'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'order-list',
    onMouseDown: e => {
      e.preventDefault()
      if (!isAvailable($selector, __S_)) return
      document.execCommand('insertOrderedList')
      $(document).trigger('selectionchange')
    }
  })

  if (opts.tooltip.length > 0) {
    addTooltip(menu.$container, __S_, opts.tooltip)
  }

  el.$document.on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (hasTagInRange(range, 'PRE')) {
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
