import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  isAvailable,
  toEnable,
  toDisable
} from 'utils/common'

const defaults = {
  tooltip: '无序列表'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'unorder-list',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      e.preventDefault()
      if (!isAvailable($selector, __S_)) return
      document.execCommand('insertUnorderedList')
      $(document).trigger('selectionchange')
    }
  })

  el.$document.on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (hasTagInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (document.queryCommandState('insertUnorderedList')) {
        menu.turnOn()
      } else {
        menu.turnOff()
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
