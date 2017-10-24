import { hasTagsOrInRange } from 'utils/selection'

import style from './fore-color.scss'

const defaults = {
  tooltip: '文本颜色',
  customColors: [ '#C25', '#E62', '#EA0', '#19F', '#333' ]
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)

  const menu = new widget.ColorMenu($selector, {
    icon: 'fore-color',
    tooltip: opts.tooltip,
    customColors: opts.customColors,
    onPick: color => {
      document.execCommand('foreColor', false, color)
      el.$document.trigger('selectionchange')
    }
  })

  util.addSelectionChangeEvent((isInArea, range) => {
    if (isInArea) {
      util.toEnable(() => menu.enable())
    } else {
      util.toDisable(() => menu.disable())
    }

    if (isInArea) {
      if (hasTagsOrInRange(range, ['PRE'])) {
        util.toDisable(() => menu.disable())
      }
    }
  })
}

const foreColor = {
  name: 'fore-color',
  run: sciprt,
  style
}

export default foreColor
