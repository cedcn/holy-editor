import style from './bold.scss'

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
  tooltip: '粗体'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)

  const menu = new widget.Menu($selector, {
    icon: 'bold',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      document.execCommand('bold')
      el.$document.trigger('selectionchange')
    }
  })

  el.$document.on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (hasTagInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (document.queryCommandState('bold')) {
        menu.turnOn()
      } else {
        menu.turnOff()
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
