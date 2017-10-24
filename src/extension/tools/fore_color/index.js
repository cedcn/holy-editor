import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  toEnable,
  toDisable
} from 'utils/common'

import style from './fore-color.scss'

const defaults = {
  tooltip: '文本颜色',
  customColors: [ '#C25', '#E62', '#EA0', '#19F', '#333' ]
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)

  const menu = new widget.ColorMenu($selector, {
    icon: 'fore-color',
    tooltip: opts.tooltip,
    customColors: opts.customColors,
    onPick: color => {
      document.execCommand('foreColor', false, color)
      $(document).trigger('selectionchange')
    }
  })

  el.$document.on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => {
        menu.enable()
      })

      const range = getRange()
      if (hasTagInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => {
          menu.disable()
        })
      }
    } else {
      toDisable($selector, __S_, () => {
        menu.disable()
      })
    }
  })
}

const foreColor = {
  name: 'fore-color',
  run: sciprt,
  style
}

export default foreColor
