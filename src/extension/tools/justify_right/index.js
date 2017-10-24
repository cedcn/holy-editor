import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '居右对齐'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'justify-right',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      document.execCommand('justifyRight')
      $(document).trigger('selectionchange')
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

      if (document.queryCommandState('justifyRight')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const justifyRight = {
  name: 'justify-right',
  run: sciprt,
  style: ''
}

export default justifyRight
