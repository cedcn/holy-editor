import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '居中对齐'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'justify-center',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      document.execCommand('justifyCenter')
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

      if (document.queryCommandState('justifyCenter')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const justifyCenter = {
  name: 'justify-center',
  run: sciprt,
  style: ''
}

export default justifyCenter
