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
  tooltip: '斜体'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'italic',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      e.preventDefault()

      if (!isAvailable($selector, __S_)) return
      document.execCommand('italic')
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

      if (document.queryCommandState('italic')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const italic = {
  name: 'italic',
  run: sciprt,
  style: ''
}

export default italic
