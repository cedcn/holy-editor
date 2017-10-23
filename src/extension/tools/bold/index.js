import style from './bold.scss'

import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  toEnable,
  toActive,
  toDeactive,
  toDisable,
  addTooltip
} from 'utils/common'

const defaults = {
  tooltip: '粗体'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)

  const menu = new widget.Menu($selector, {
    icon: 'bold',
    onMouseDown: e => {
      document.execCommand('bold')
      el.$document.trigger('selectionchange')
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

      if (document.queryCommandState('bold')) {
        toActive($selector, __S_)
      } else {
        toDeactive($selector, __S_)
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const bold = {
  name: 'bold',
  run: sciprt,
  style
}

export default bold
