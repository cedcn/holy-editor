import style from './bold.scss'

import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '粗体'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)

  const menu = new widget.Menu($selector, {
    icon: 'bold',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      document.execCommand('bold')
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

      if (document.queryCommandState('bold')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const bold = {
  name: 'bold',
  run: sciprt,
  style
}

export default bold
