import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  toEnable,
  toDisable,
  addTooltip
} from 'utils/common'

const defaults = {
  tooltip: '居中对齐'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'justify-center',
    onMouseDown: e => {
      document.execCommand('justifyCenter')
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

      if (document.queryCommandState('justifyCenter')) {
        $selector.addClass(__S_['is-active'].className)
      } else {
        $selector.removeClass(__S_['is-active'].className)
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const justifyCenter = {
  name: 'justify-center',
  run: sciprt,
  style: ''
}

export default justifyCenter
