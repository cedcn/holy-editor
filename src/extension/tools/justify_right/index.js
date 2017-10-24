import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  toEnable,
  toDisable
} from 'utils/common'

const defaults = {
  tooltip: '居右对齐'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'justify-right',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      document.execCommand('justifyRight')
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

      if (document.queryCommandState('justifyRight')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const justifyRight = {
  name: 'justify-right',
  run: sciprt,
  style: ''
}

export default justifyRight
