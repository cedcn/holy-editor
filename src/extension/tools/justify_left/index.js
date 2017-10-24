import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '居左对齐'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'justify-left',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      document.execCommand('justifyLeft')
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

      if (document.queryCommandState('justifyLeft')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const justifyLeft = {
  name: 'justify-left',
  run: sciprt,
  style: ''
}

export default justifyLeft
